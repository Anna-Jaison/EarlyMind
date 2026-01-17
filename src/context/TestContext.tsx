import { createContext, useContext, useState, ReactNode } from 'react';

// Define the response item type used in tests
export interface TestResponseItem {
    audio?: string;    // Used in Audio Test
    text_word?: string; // Used in Reading Test
    selected: string;
    correct: boolean;
    reaction_time: number;
}

export interface DysgraphiaResult {
    median_letter_height: number;
    spacing_cv: number;
    size_cv: number;
    ocr_score: number;
    risk_score: number;
    verdict: string;
    word_boxes: any[];
}

interface TestContextType {
    audioTestResults: TestResponseItem[];
    setAudioTestResults: (results: TestResponseItem[]) => void;
    readingTestResults: TestResponseItem[];
    setReadingTestResults: (results: TestResponseItem[]) => void;
    dysgraphiaResult: DysgraphiaResult | null;
    setDysgraphiaResult: (result: DysgraphiaResult | null) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
    const [audioTestResults, setAudioTestResults] = useState<TestResponseItem[]>([]);
    const [readingTestResults, setReadingTestResults] = useState<TestResponseItem[]>([]);
    const [dysgraphiaResult, setDysgraphiaResult] = useState<DysgraphiaResult | null>(null);

    return (
        <TestContext.Provider value={{
            audioTestResults,
            setAudioTestResults,
            readingTestResults,
            setReadingTestResults,
            dysgraphiaResult,
            setDysgraphiaResult
        }}>
            {children}
        </TestContext.Provider>
    );
}

export function useTestContext() {
    const context = useContext(TestContext);
    if (context === undefined) {
        throw new Error('useTestContext must be used within a TestProvider');
    }
    return context;
}
