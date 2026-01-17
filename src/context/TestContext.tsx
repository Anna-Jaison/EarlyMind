import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the response item type used in tests
export interface TestResponseItem {
    audio?: string;    // Used in Audio Test
    text_word?: string; // Used in Reading Test
    selected: string;
    correct: boolean;
    reaction_time: number;
}

interface TestContextType {
    audioTestResults: TestResponseItem[];
    setAudioTestResults: (results: TestResponseItem[]) => void;
    readingTestResults: TestResponseItem[];
    setReadingTestResults: (results: TestResponseItem[]) => void;
    // Handwriting result placeholder if needed later
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
    const [audioTestResults, setAudioTestResults] = useState<TestResponseItem[]>([]);
    const [readingTestResults, setReadingTestResults] = useState<TestResponseItem[]>([]);

    return (
        <TestContext.Provider value={{
            audioTestResults,
            setAudioTestResults,
            readingTestResults,
            setReadingTestResults
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
