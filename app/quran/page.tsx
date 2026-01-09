'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { QuranReader } from '@/components/quran/quran-reader';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { BookOpen, Type, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw, FileText, Search, Menu } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { PARA_NAMES } from '@/lib/quran/constants';

interface QuranData {
  surah: {
    id: number;
    name: string;
    nameArabic: string;
    verses: Array<{
      id: number;
      number: number;
      surahNumber: number;
      arabic: string;
      translation: string;
      words: Array<{
        id: string;
        arabic: string;
        clean: string;
        translation: string;
        lemma: string;
        root: string;
        meaning: string;
        tajweed: string[];
      }>;
    }>;
  };
  totalSurahs: number;
}

export default function QuranPage() {
  const [fontSize, setFontSize] = useState([27]);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [currentSurah, setCurrentSurah] = useState(1);
  const [currentPara, setCurrentPara] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [quranData, setQuranData] = useState<QuranData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [primaryMode, setPrimaryMode] = useState<'quran' | 'noorani'>('quran');
  const [viewMode, setViewMode] = useState<'surah' | 'para'>('surah');
  const [quranType, setQuranType] = useState<'tajweed' | 'urdu' | 'english'>('english');
  const [translationLang, setTranslationLang] = useState<'english' | 'urdu'>('english');
  const [nooraniLang, setNooraniLang] = useState<'english' | 'urdu'>('english');
  const [nooraniLoading, setNooraniLoading] = useState(true);
  // const [showSurahList, setShowSurahList] = useState(false);
  // const [showParaList, setShowParaList] = useState(false);
  const [surahQuery, setSurahQuery] = useState('');
  const [paraQuery, setParaQuery] = useState('');
  const [surahListState, setSurahListState] = useState<any[]>([]);
  const [totalVersesCurrent, setTotalVersesCurrent] = useState<number>(0);
  const versesPerPage = 10;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pageInput, setPageInput] = useState('');

  const parseArabicWords = useCallback((arabicText: string, verseNumber: number) => {
    const words = arabicText.trim().split(/\s+/);
    return words.map((word, index) => ({
      id: `${currentSurah}-${verseNumber}-${index}`,
      arabic: word,
      clean: word.replace(/[\u064B-\u0652\u0670\u0640]/g, ''),
      translation: '',
      lemma: '',
      root: '',
      meaning: '',
      tajweed: []
    }));
  }, [currentSurah]);

  // loadSurahList effect is below; the data-fetch effect is moved after callbacks

  useEffect(() => {
    const loadSurahList = async () => {
      try {
        const res = await fetch('https://api.alquran.cloud/v1/surah');
        if (!res.ok) return;
        const data = await res.json();
        const items = (data?.data || []).map((s: any) => ({
          id: s.number,
          nameArabic: s.name,
          nameEnglish: s.englishName,
          verses: s.numberOfAyahs
        }));
        if (items?.length) setSurahListState(items);
      } catch { }
    };
    loadSurahList();
  }, []);

  const fetchSurahData = useCallback(async (surahNumber: number, page: number) => {
    setLoading(true);
    setError(null);

    try {
      let translationEdition = 'en.asad'; // Default English
      if (quranType === 'urdu') {
        translationEdition = 'ur.jalandhry';
      }

      const [surahResponse, translationResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`),
        quranType !== 'tajweed' ? fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translationEdition}`) : Promise.resolve(null)
      ]);

      if (!surahResponse.ok) {
        throw new Error('Failed to fetch Qur\'an data');
      }

      const surahData = await surahResponse.json();
      const translationData = translationResponse ? await translationResponse.json() : null;

      // Paginate verses
      const startIndex = (page - 1) * versesPerPage;
      const endIndex = startIndex + versesPerPage;
      const paginatedVerses = surahData.data.ayahs.slice(startIndex, endIndex);

      // Transform API data to our format
      const transformedData: QuranData = {
        surah: {
          id: surahData.data.number,
          name: surahData.data.englishName,
          nameArabic: surahData.data.name,
          verses: paginatedVerses.map((ayah: any, index: number) => ({
            id: ayah.number,
            number: ayah.numberInSurah,
            surahNumber: surahData.data.number,
            arabic: ayah.text,
            translation: translationData ? translationData.data.ayahs[startIndex + index]?.text || '' : '',
            words: parseArabicWords(ayah.text, ayah.numberInSurah)
          }))
        },
        totalSurahs: 114
      };

      setTotalVersesCurrent(surahData.data.ayahs.length);
      setQuranData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Qur\'an data');
    } finally {
      setLoading(false);
    }
  }, [quranType, parseArabicWords]);

  const fetchParaData = useCallback(async (paraNumber: number, page: number) => {
    setLoading(true);
    setError(null);

    try {
      let translationEdition = 'en.asad';
      if (quranType === 'urdu') {
        translationEdition = 'ur.jalandhry';
      }

      const [paraResponse, translationResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/juz/${paraNumber}/quran-uthmani`),
        quranType !== 'tajweed' ? fetch(`https://api.alquran.cloud/v1/juz/${paraNumber}/${translationEdition}`) : Promise.resolve(null)
      ]);

      if (!paraResponse.ok) {
        throw new Error('Failed to fetch Para data');
      }

      const paraData = await paraResponse.json();
      const translationData = translationResponse ? await translationResponse.json() : null;

      // Paginate verses
      const startIndex = (page - 1) * versesPerPage;
      const endIndex = startIndex + versesPerPage;
      const paginatedVerses = paraData.data.ayahs.slice(startIndex, endIndex);

      // Transform para data
      const transformedData: QuranData = {
        surah: {
          id: paraNumber,
          name: PARA_NAMES.find(p => p.id === paraNumber)?.name || `Para ${paraNumber}`,
          nameArabic: PARA_NAMES.find(p => p.id === paraNumber)?.nameArabic || `الجزء ${paraNumber}`,
          verses: paginatedVerses.map((ayah: any, index: number) => ({
            id: ayah.number,
            number: ayah.numberInSurah,
            surahNumber: ayah.surah?.number ?? 0,
            arabic: ayah.text,
            translation: translationData ? translationData.data.ayahs[startIndex + index]?.text || '' : '',
            words: parseArabicWords(ayah.text, ayah.numberInSurah)
          }))
        },
        totalSurahs: 30
      };

      setTotalVersesCurrent(paraData.data.ayahs.length);
      setQuranData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Para data');
    } finally {
      setLoading(false);
    }
  }, [quranType, parseArabicWords]);

  // Fetch Qur'an data from API
  useEffect(() => {
    if (primaryMode !== 'quran') return;
    if (viewMode === 'surah') {
      fetchSurahData(currentSurah, currentPage);
    } else if (viewMode === 'para') {
      fetchParaData(currentPara, currentPage);
    }
  }, [currentSurah, currentPara, currentPage, primaryMode, viewMode, fetchSurahData, fetchParaData]);

  useEffect(() => {
    if (primaryMode === 'noorani') {
      setNooraniLoading(true);
    }
  }, [nooraniLang, primaryMode]);


  const handlePrevious = () => {
    if (viewMode === 'surah') {
      if (currentSurah > 1) {
        setCurrentSurah(currentSurah - 1);
        setCurrentPage(1);
      }
    } else {
      if (currentPara > 1) {
        setCurrentPara(currentPara - 1);
        setCurrentPage(1);
      }
    }
  };

  const handleNext = () => {
    if (viewMode === 'surah') {
      if (currentSurah < 114) {
        setCurrentSurah(currentSurah + 1);
        setCurrentPage(1);
      }
    } else {
      if (currentPara < 30) {
        setCurrentPara(currentPara + 1);
        setCurrentPage(1);
      }
    }
  };

  const handleReset = () => {
    setCurrentSurah(1);
    setCurrentPara(1);
    setCurrentPage(1);
    setFontSize([20]);
    setSelectedWord(null);
    setQuranType('english');
  };

  const getTotalPages = () => {
    if (!quranData) return 1;
    const totalVerses = totalVersesCurrent || 0;
    return Math.ceil(totalVerses / versesPerPage);
  };

  // Keep input independent so placeholder is visible when empty



  if (error && primaryMode === 'quran') {
    return (
      <div className="container py-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={() => viewMode === 'surah' ? fetchSurahData(currentSurah, currentPage) : fetchParaData(currentPara, currentPage)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 overflow-x-hidden">
      <div className="md:hidden mb-3">
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4 mr-2" />
              Navigation
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="p-4 space-y-4">
              <Tabs value={primaryMode} onValueChange={(value) => setPrimaryMode(value as any)}>
                <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                  <TabsTrigger value="quran" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-primary/40">Qur'an</TabsTrigger>
                  <TabsTrigger value="noorani" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-sm">Noorani</TabsTrigger>
                </TabsList>
              </Tabs>

              {primaryMode === 'quran' ? (
                <div className="space-y-4">
                  <Tabs
                    value={quranType === 'tajweed' ? 'tajweed' : 'translation'}
                    onValueChange={(value) => {
                      if (value === 'tajweed') {
                        setQuranType('tajweed');
                      } else {
                        setQuranType(translationLang);
                      }
                    }}
                  >
                    <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                      <TabsTrigger value="translation" className="text-xs rounded-full px-4 h-7 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-primary/40">With Translation</TabsTrigger>
                      <TabsTrigger value="tajweed" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-primary/40">Tajweed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="translation" className="mt-2">
                      <Tabs value={translationLang} onValueChange={(value) => { setTranslationLang(value as any); setQuranType(value as any); }}>
                        <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                          <TabsTrigger value="english" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">English</TabsTrigger>
                          <TabsTrigger value="urdu" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Urdu</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </TabsContent>
                  </Tabs>

                  <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                    <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                      <TabsTrigger value="surah" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Surah</TabsTrigger>
                      <TabsTrigger value="para" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Para</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="relative">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 h-9"
                      type={viewMode === 'para' || viewMode === 'surah' ? 'number' : 'text'}
                      inputMode={viewMode === 'para' || viewMode === 'surah' ? 'numeric' : undefined}
                      min={viewMode === 'para' ? 1 : viewMode === 'surah' ? 1 : undefined}
                      max={viewMode === 'para' ? 30 : viewMode === 'surah' ? 114 : undefined}
                      placeholder={viewMode === 'surah' ? 'Enter Surah (1–114)' : 'Enter Para (1–30)'}
                      value={viewMode === 'surah' ? surahQuery : paraQuery}
                      onChange={(e) => (
                        viewMode === 'surah'
                          ? ((): void => {
                            const raw = e.target.value;
                            if (raw === '') { setSurahQuery(''); return; }
                            const onlyDigits = raw.replace(/\D/g, '');
                            if (onlyDigits === '') { setSurahQuery(''); return; }
                            const num = Math.max(1, Math.min(114, Number(onlyDigits)));
                            setSurahQuery(String(num));
                          })()
                          : ((): void => {
                            const raw = e.target.value;
                            if (raw === '') { setParaQuery(''); return; }
                            const onlyDigits = raw.replace(/\D/g, '');
                            if (onlyDigits === '') { setParaQuery(''); return; }
                            const num = Math.max(1, Math.min(30, Number(onlyDigits)));
                            setParaQuery(String(num));
                          })()
                      )}
                    />
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto rounded-md border">
                    {viewMode === 'surah'
                      ? surahListState
                        .filter((s) =>
                          s.nameEnglish.toLowerCase().includes(surahQuery.toLowerCase()) ||
                          s.nameArabic.includes(surahQuery) ||
                          String(s.id).includes(surahQuery)
                        )
                        .map((surah) => (
                          <button
                            key={surah.id}
                            className={`${currentSurah === surah.id ? 'bg-primary/5' : ''} w-full text-left p-3 hover:bg-primary/10 transition-colors`}
                            onClick={() => { setCurrentSurah(surah.id); setCurrentPage(1); setMobileNavOpen(false); }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">{surah.id}. {surah.nameEnglish}</span>
                              <span className="arabic-text text-primary text-sm">{surah.nameArabic}</span>
                            </div>
                          </button>
                        ))
                      : PARA_NAMES
                        .filter((p) =>
                          p.name.toLowerCase().includes(paraQuery.toLowerCase()) ||
                          p.nameArabic.includes(paraQuery) ||
                          String(p.id).includes(paraQuery)
                        )
                        .map((para) => (
                          <button
                            key={para.id}
                            className={`${currentPara === para.id ? 'bg-secondary/5' : ''} w-full text-left p-3 hover:bg-secondary/10 transition-colors`}
                            onClick={() => { setCurrentPara(para.id); setCurrentPage(1); setMobileNavOpen(false); }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">{para.id}. {para.name}</span>
                              <span className="arabic-text text-secondary text-sm">{para.nameArabic}</span>
                            </div>
                          </button>
                        ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Type className="h-5 w-5 text-muted-foreground" />
                    <div className="w-36">
                      <Slider value={fontSize} onValueChange={setFontSize} max={45} min={16} step={2} />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{fontSize[0]}px</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-16 rounded-full justify-center"
                      onClick={handlePrevious}
                      disabled={viewMode === 'surah' ? currentSurah === 1 : currentPara === 1}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-16 rounded-full justify-center"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            aria-label="First page"
                            title="First page"
                          >
                            <ChevronsLeft className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>First page</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-16 rounded-full gap-1"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      title="Previous page"
                      aria-label="Previous page"
                    >
                      <span className="text-xs">Pg</span>
                      <ChevronLeft className="h-3 w-3 ml-1" />
                    </Button>
                    <Badge variant="secondary" className="text-xs rounded-full">{currentPage}/{getTotalPages()}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-16 rounded-full gap-1"
                      onClick={() => setCurrentPage(Math.min(getTotalPages(), currentPage + 1))}
                      disabled={currentPage === getTotalPages()}
                      title="Next page"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span className="text-xs">Pg</span>
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-16 rounded-full justify-center"
                            onClick={() => setCurrentPage(getTotalPages())}
                            disabled={currentPage === getTotalPages()}
                            aria-label="Last page"
                            title="Last page"
                          >
                            <ChevronsRight className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Last page</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-16 rounded-full justify-center"
                      onClick={handleNext}
                      disabled={viewMode === 'surah' ? currentSurah === 114 : currentPara === 30}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-full" onClick={handleReset}>
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Tabs value={nooraniLang} onValueChange={(value) => setNooraniLang(value as any)}>
                    <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                      <TabsTrigger value="english" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">English</TabsTrigger>
                      <TabsTrigger value="urdu" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Urdu</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-6">
        <aside className="w-80 shrink-0 hidden md:block">
          <Card>
            <CardContent className="p-4 space-y-4">
              <Tabs value={primaryMode} onValueChange={(value) => setPrimaryMode(value as any)}>
                <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                  <TabsTrigger value="quran" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-primary/40">Qur'an</TabsTrigger>
                  <TabsTrigger value="noorani" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-sm">Noorani</TabsTrigger>
                </TabsList>
              </Tabs>

              {primaryMode === 'quran' ? (
                <div className="space-y-4">
                  <Tabs
                    value={quranType === 'tajweed' ? 'tajweed' : 'translation'}
                    onValueChange={(value) => {
                      if (value === 'tajweed') {
                        setQuranType('tajweed');
                      } else {
                        setQuranType(translationLang);
                      }
                    }}
                  >
                    <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                      <TabsTrigger value="translation" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-primary/40">With Translation</TabsTrigger>
                      <TabsTrigger value="tajweed" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-primary/30 data-[state=active]:text-primary data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-primary/40">Tajweed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="translation" className="mt-2">
                      <Tabs value={translationLang} onValueChange={(value) => { setTranslationLang(value as any); setQuranType(value as any); }}>
                        <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                          <TabsTrigger value="english" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">English</TabsTrigger>
                          <TabsTrigger value="urdu" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Urdu</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </TabsContent>
                  </Tabs>

                  <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                    <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                      <TabsTrigger value="surah" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Surah</TabsTrigger>
                      <TabsTrigger value="para" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Para</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="relative">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8 h-9"
                      type={viewMode === 'para' || viewMode === 'surah' ? 'number' : 'text'}
                      inputMode={viewMode === 'para' || viewMode === 'surah' ? 'numeric' : undefined}
                      min={viewMode === 'para' ? 1 : viewMode === 'surah' ? 1 : undefined}
                      max={viewMode === 'para' ? 30 : viewMode === 'surah' ? 114 : undefined}
                      placeholder={viewMode === 'surah' ? 'Enter Surah (1–114)' : 'Enter Para (1–30)'}
                      value={viewMode === 'surah' ? surahQuery : paraQuery}
                      onChange={(e) => (
                        viewMode === 'surah'
                          ? ((): void => {
                            const raw = e.target.value;
                            if (raw === '') { setSurahQuery(''); return; }
                            const onlyDigits = raw.replace(/\D/g, '');
                            if (onlyDigits === '') { setSurahQuery(''); return; }
                            const num = Math.max(1, Math.min(114, Number(onlyDigits)));
                            setSurahQuery(String(num));
                          })()
                          : ((): void => {
                            const raw = e.target.value;
                            if (raw === '') { setParaQuery(''); return; }
                            const onlyDigits = raw.replace(/\D/g, '');
                            if (onlyDigits === '') { setParaQuery(''); return; }
                            const num = Math.max(1, Math.min(30, Number(onlyDigits)));
                            setParaQuery(String(num));
                          })()
                      )}
                    />
                  </div>

                  <div className="max-h-[200px] overflow-y-auto rounded-md border">
                    {viewMode === 'surah'
                      ? surahListState
                        .filter((s) =>
                          s.nameEnglish.toLowerCase().includes(surahQuery.toLowerCase()) ||
                          s.nameArabic.includes(surahQuery) ||
                          String(s.id).includes(surahQuery)
                        )
                        .map((surah) => (
                          <button
                            key={surah.id}
                            className={`${currentSurah === surah.id ? 'bg-primary/5' : ''} w-full text-left p-3 hover:bg-primary/10 transition-colors`}
                            onClick={() => { setCurrentSurah(surah.id); setCurrentPage(1); }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">{surah.id}. {surah.nameEnglish}</span>
                              <span className="arabic-text text-primary text-sm">{surah.nameArabic}</span>
                            </div>
                          </button>
                        ))
                      : PARA_NAMES
                        .filter((p) =>
                          p.name.toLowerCase().includes(paraQuery.toLowerCase()) ||
                          p.nameArabic.includes(paraQuery) ||
                          String(p.id).includes(paraQuery)
                        )
                        .map((para) => (
                          <button
                            key={para.id}
                            className={`${currentPara === para.id ? 'bg-secondary/5' : ''} w-full text-left p-3 hover:bg-secondary/10 transition-colors`}
                            onClick={() => { setCurrentPara(para.id); setCurrentPage(1); }}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium">{para.id}. {para.name}</span>
                              <span className="arabic-text text-secondary text-sm">{para.nameArabic}</span>
                            </div>
                          </button>
                        ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Type className="h-5 w-5 text-muted-foreground" />
                    <div className="w-36">
                      <Slider value={fontSize} onValueChange={setFontSize} max={45} min={16} step={2} />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{fontSize[0]}px</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-16 rounded-full justify-center"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            aria-label="First page"
                            title="First page"
                          >
                            <ChevronsLeft className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>First page</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-16 rounded-full gap-1"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      title="Previous page"
                      aria-label="Previous page"
                    >
                      <span className="text-xs">Pg</span>
                      <ChevronLeft className="h-3 w-3 ml-1" />
                    </Button>
                    <Badge variant="secondary" className="text-xs rounded-full">{currentPage}/{getTotalPages()}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-16 rounded-full gap-1"
                      onClick={() => setCurrentPage(Math.min(getTotalPages(), currentPage + 1))}
                      disabled={currentPage === getTotalPages()}
                      title="Next page"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      <span className="text-xs">Pg</span>
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-16 rounded-full justify-center"
                            onClick={() => setCurrentPage(getTotalPages())}
                            disabled={currentPage === getTotalPages()}
                            aria-label="Last page"
                            title="Last page"
                          >
                            <ChevronsRight className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Last page</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="ghost" size="sm" className="h-8 rounded-full" onClick={handleReset}>
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Tabs value={nooraniLang} onValueChange={(value) => setNooraniLang(value as any)}>
                    <TabsList className="h-9 rounded-full bg-muted/30 p-1 gap-1 shadow-inner">
                      <TabsTrigger value="english" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">English</TabsTrigger>
                      <TabsTrigger value="urdu" className="text-xs rounded-full px-3 h-7 data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:shadow-sm">Urdu</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1">
          {primaryMode === 'noorani' ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Noorani Qaida {nooraniLang}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 bg-muted/20 rounded-lg relative">
                  {nooraniLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
                        <p className="text-muted-foreground text-sm">Loading PDF...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    key={nooraniLang}
                    src={nooraniLang === 'english' ? 'https://archive.org/embed/NooraniQaidaEnglish' : 'https://archive.org/embed/NooraniQaida_201701'}
                    width="100%"
                    height="600"
                    className="border rounded-lg"
                    title="Noorani Qaida PDF"
                    allowFullScreen
                    onLoad={() => setNooraniLoading(false)}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex-1">
                <Card className="mb-6 border-2 border-primary/20">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="arabic-text text-primary">{quranData?.surah.nameArabic}</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-secondary">{quranData?.surah.name}</span>
                    </CardTitle>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">Page</Badge>
                        <div className="inline-flex items-center h-8 rounded-full border px-2 bg-background">
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={pageInput}
                            onChange={(e) => {
                              const raw = e.target.value;
                              if (raw === '') { setPageInput(''); return; }
                              const onlyDigits = raw.replace(/\D/g, '');
                              if (onlyDigits === '') { setPageInput(''); return; }
                              const num = Math.max(1, Math.min(getTotalPages(), Number(onlyDigits)));
                              setPageInput(String(num));
                              setCurrentPage(num);
                            }}
                            className="h-6 w-14 text-center border-0 shadow-none focus-visible:ring-0 px-0 placeholder:text-muted-foreground"
                            placeholder={`1-${getTotalPages()}`}
                          />
                          <span className="px-2 text-sm text-muted-foreground">of {getTotalPages()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="h-8 rounded-full"
                        >
                          <ChevronLeft className="h-3 w-3 mr-1" />
                          Prev
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.min(getTotalPages(), currentPage + 1))}
                          disabled={currentPage === getTotalPages()}
                          className="h-8 rounded-full"
                        >
                          Next
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {loading ? (
                  <div className="flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading Qur'an...</p>
                    </div>
                  </div>
                ) : (
                  quranData && (
                    <QuranReader
                      surah={quranData.surah}
                      fontSize={fontSize[0]}
                      showTajweed={quranType === 'tajweed'}
                      onWordClick={setSelectedWord}
                      quranType={quranType}
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Enhanced CTA Section */}
      <Card className="mt-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ready for Structured Learning?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            While reading is beneficial, structured courses with certified teachers provide
            comprehensive Qur'an education. Start your free 3-day trial today!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" asChild>
              <a href="/courses">
                Start Free Trial
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10" asChild>
              <a href="/teachers">
                Meet Our Teachers
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
