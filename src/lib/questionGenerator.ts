import { type Kana } from '../data/kana';
import { type SentenceProblem } from '../data/lessons';

export interface QuestionPrompt {
    id: string;
    type: 'fillblank' | 'sentence';
    text: string;
    answer: string;
    explanation?: string;
}

export interface GeneratedCard {
    id: string;
    name: string;
    description: string;
    type: 'attack' | 'skill';
    cost: number;
    value: number;
    prompt: QuestionPrompt;
}

export class QuestionGenerator {
    private static instance: QuestionGenerator;
    private usedPrompts = new Set<string>();

    static getInstance(): QuestionGenerator {
        if (!QuestionGenerator.instance) {
            QuestionGenerator.instance = new QuestionGenerator();
        }
        return QuestionGenerator.instance;
    }

    generateKanaQuestions(kanaItems: Kana[], count: number = 3): QuestionPrompt[] {
        const questions: QuestionPrompt[] = [];
        const availableKana = [...kanaItems];

        for (let i = 0; i < count && availableKana.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableKana.length);
            const kana = availableKana.splice(randomIndex, 1)[0];

            const questionType = Math.random() > 0.5 ? 'romaji' : 'meaning';
            const questionId = `kana-${kana.char}-${questionType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            if (this.usedPrompts.has(questionId)) continue;

            let question: QuestionPrompt;

            if (questionType === 'romaji') {
                question = {
                    id: questionId,
                    type: 'fillblank',
                    text: `What is the romaji for this kana: ${kana.char}?`,
                    answer: kana.romaji,
                    explanation: `The kana ${kana.char} is pronounced "${kana.romaji}".`
                };
            } else {
                question = {
                    id: questionId,
                    type: 'fillblank',
                    text: `What is the romaji for this kana: ${kana.char}?`,
                    answer: kana.romaji,
                    explanation: `The kana ${kana.char} is pronounced "${kana.romaji}".`
                };
            }

            questions.push(question);
            this.usedPrompts.add(questionId);
        }

        return questions;
    }

    generateSentenceQuestions(sentences: SentenceProblem[], count: number = 2): QuestionPrompt[] {
        const questions: QuestionPrompt[] = [];
        const availableSentences = [...sentences];

        for (let i = 0; i < count && availableSentences.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableSentences.length);
            const sentence = availableSentences.splice(randomIndex, 1)[0];

            const questionId = `sentence-${sentence.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            if (this.usedPrompts.has(questionId)) continue;

            const question: QuestionPrompt = {
                id: questionId,
                type: 'sentence',
                text: `Complete this sentence: "${sentence.english}"`,
                answer: sentence.japanese,
                explanation: `The sentence "${sentence.english}" translates to "${sentence.japanese}" in Japanese.`
            };

            questions.push(question);
            this.usedPrompts.add(questionId);
        }

        return questions;
    }

    generateFillBlankQuestions(fillBlanks: any[], count: number = 2): QuestionPrompt[] {
        const questions: QuestionPrompt[] = [];
        const availableProblems = [...fillBlanks];

        for (let i = 0; i < count && availableProblems.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableProblems.length);
            const problem = availableProblems.splice(randomIndex, 1)[0];

            const questionId = `fillblank-${problem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            if (this.usedPrompts.has(questionId)) continue;

            const question: QuestionPrompt = {
                id: questionId,
                type: 'fillblank',
                text: problem.question,
                answer: problem.answer,
                explanation: problem.explanation || `The correct answer is "${problem.answer}".`
            };

            questions.push(question);
            this.usedPrompts.add(questionId);
        }

        return questions;
    }

    generateCardsFromQuestions(questions: QuestionPrompt[], lessonTitle: string): GeneratedCard[] {
        return questions.map((question) => {
            const isAttack = Math.random() > 0.5;
            const cardName = isAttack ? `Lesson Strike` : `Lesson Guard`;
            const cardDescription = isAttack ? `Attack with ${lessonTitle} knowledge` : `Block with ${lessonTitle} knowledge`;
            const cardValue = isAttack ? 6 : 4;
            const cardCost = isAttack ? 1 : 1;

            return {
                id: `card-${question.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: cardName,
                description: cardDescription,
                type: isAttack ? 'attack' : 'skill',
                cost: cardCost,
                value: cardValue,
                prompt: question
            };
        });
    }

    generateLessonCards(
        kanaItems: Kana[] = [],
        sentences: SentenceProblem[] = [],
        fillBlanks: any[] = [],
        lessonTitle: string = 'Unknown Lesson'
    ): GeneratedCard[] {
        const kanaQuestions = this.generateKanaQuestions(kanaItems, 2);
        const sentenceQuestions = this.generateSentenceQuestions(sentences, 1);
        const fillBlankQuestions = this.generateFillBlankQuestions(fillBlanks, 1);

        const allQuestions = [...kanaQuestions, ...sentenceQuestions, ...fillBlankQuestions];

        return this.generateCardsFromQuestions(allQuestions, lessonTitle);
    }

    resetUsedPrompts(): void {
        this.usedPrompts.clear();
    }

    markPromptAsUsed(promptId: string): void {
        this.usedPrompts.add(promptId);
    }

    isPromptUsed(promptId: string): boolean {
        return this.usedPrompts.has(promptId);
    }
}

export const questionGenerator = QuestionGenerator.getInstance();