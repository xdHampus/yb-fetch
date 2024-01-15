import axios, { AxiosResponse, AxiosStatic } from 'axios';
import * as cheerio from 'cheerio';


/******************************************************************************************
 * YellowBridge API models
 ******************************************************************************************/

/** 
 * YellowBridge character stroke info 
 * 
 * @property {string} englishDefinition - English definition of character
 * @property {string} simplifiedScript - Simplified script of character
 * @property {string} traditionalScript - Traditional script of character
 * @property {string} partOfSpeech - Part of speech of character
 * @property {string} kangxiRadical - Kangxi radical of character
 * @property {number} additionalStrokes - Additional strokes of character
 * @property {number} totalStrokes - Total strokes of character
 * @property {string} structure - Structure of character (e.g. "left-to-right")
 * 
 * */
export type WordStrokeInfo = {
    englishDefinition: string;
    simplifiedScript: string;
    traditionalScript: string;
    partOfSpeech: string;
    kangxiRadical: string;
    additionalStrokes: number;
    totalStrokes: number;
    structure: string;
}

/** 
 * YellowBridge character etymology 
 * 
 * @property {string} definition - Definition of character
 * @property {string} formationMethod - Formation method of character
 * @property {string} simplificationMethod - Simplification method of character
 * 
 * */
export type CharacterEtymology = {
    definition: string;
    formationMethod: string;
    simplificationMethod: string;
}

/** 
 * YellowBridge character details 
 * 
 * @property {string} meaningDefinition - Meaning definition of character
 * @property {string} pronuciationMandarin - Mandarin pronunciation of character
 * @property {string} pronuciationCantonese - Cantonese pronunciation of character
 * @property {string} pronunciationJapaneseKun - Japanese Kun pronunciation of character
 * @property {string} pronunciationJapaneseOn - Japanese On pronunciation of character
 * @property {string} pronunciationKorean - Korean pronunciation of character
 * @property {string} pronunciationVietnamese - Vietnamese pronunciation of character
 * @property {number} characterRankSimplified - Simplified character rank
 * @property {number} characterRankEverydayUsage - Everyday usage character rank
 * @property {number} characterRankHsk3 - HSK3 character rank
 * @property {number} characterRankHsk3Writing - HSK3 writing character rank
 * @property {string} relatedCharacterKangxiRadical - Kangxi radical of related character
 * @property {string} relatedCharacterTraditionalScript - Traditional script of related character
 * @property {string} relatedSemantic - Semantic of related character
 * @property {string} relatedSpecializedSemantic - Specialized semantic of related character
 * @property {string[]} commonWordsWithCharacter - Common words with character
 * @property {object[]} inputMethodCodes - Input method codes for character
 * @property {object[]} computerEncoding - Computer encoding
 * 
 * */
export type CharacterDetails = {
    meaningDefinition: string;
    pronuciationMandarin: string;
    pronuciationCantonese: string;
    pronunciationJapaneseKun: string;
    pronunciationJapaneseOn: string;
    pronunciationKorean: string;
    pronunciationVietnamese: string;
    characterRankSimplified: number;
    characterRankEverydayUsage: number;
    characterRankHsk3: number;
    characterRankHsk3Writing: number;
    relatedCharacterKangxiRadical: string;
    relatedCharacterTraditionalScript: string;
    relatedSemantic: string;
    relatedSpecializedSemantic: string;
    commonWordsWithCharacter: string[];
    inputMethodCodes: {
        code: string;
        value: string;
    }[];
    computerEncoding: {
        code: string;
        value: string;
    }[];
}

/** 
 * YellowBridge word examples 
 * 
 * @property {string} englishDefinition - English definition of word
 * @property {string} simplifiedScript - Simplified script of word
 * @property {string} traditionalScript - Traditional script of word
 * @property {string} partOfSpeech - Part of speech of word eg. "noun"
 * @property {object[]} sampleSentences - Example sentences with word
 * 
 * */
export type WordExamples = {
    englishDefinition: string;
    simplifiedScript: string;
    traditionalScript: string;
    partOfSpeech: string;
    sampleSentences: {
        english: string;
        chinese: string;
    }[];
}

/** 
 * YellowBridge word meaning 
 * 
 * @property {string} englishDefinition - English definition of word
 * @property {string} simplifiedScript - Simplified script of word
 * @property {string} traditionalScript - Traditional script of word
 * @property {string} pinyin - Pinyin of word
 * @property {string} effectivePinyin - Effective pinyin of word
 * @property {string} zhuyin - Zhuyin of word
 * @property {string} cantonese - Cantonese of word
 * @property {string} partOfSpeech - Part of speech of word
 * @property {string} measureWord - Measure word of word
 * @property {string} proficiencyLevel - Proficiency level of word
 * @property {string[]} wordsWithSameHeadWord - Words with same head word
 * @property {string[]} wordsWithSameTailWord - Words with same tail word
 * 
 * */
export type WordMeaning = {
    englishDefinition: string;
    simplifiedScript: string;
    traditionalScript: string;
    pinyin: string;
    effectivePinyin: string;
    zhuyin: string;
    cantonese: string;
    partOfSpeech: string;
    measureWord: string;
    proficiencyLevel: string;
    wordsWithSameHeadWord: string[];
    wordsWithSameTailWord: string[];
}

/** 
 * YellowBridge character aggregate 
 * 
 * @property {string} word - Character
 * @property {WordStrokeInfo} strokeInfo - Stroke info
 * @property {CharacterEtymology} etymology - Etymology
 * @property {CharacterDetails} details - Details
 * @property {WordExamples} examples - Examples
 * @property {WordMeaning} meaning - Meaning
 * 
 * */
export interface WordAggregate {
    word: string;
    strokeInfo: WordStrokeInfo;
    examples: WordExamples;
    meaning: WordMeaning;
}

/** 
 * YellowBridge character aggregate 
 * 
 * @property {string} word - Character
 * @property {WordStrokeInfo} strokeInfo - Stroke info
 * @property {CharacterEtymology} etymology - Etymology
 * @property {CharacterDetails} details - Details
 * @property {WordExamples} examples - Examples
 * @property {WordMeaning} meaning - Meaning
 * 
 * */
export interface CharacterAggregate extends WordAggregate {
    etymology: CharacterEtymology;
    details: CharacterDetails;
}


/******************************************************************************************
 * YellowBridge API utility types
 ******************************************************************************************/

/** 
 * YellowBridge error 
 * 
 * @property {string} error - Error message
 * @property {number} errorHttpCode - HTTP error code
 * @property {string} errorHttpMessage - HTTP error message
 * 
 * */
export interface YbError extends Error {
    message: string;
    errorHttpCode: number | undefined;
    errorHttpMessage: string | undefined;
}

/** 
 * YellowBridge headers 
 * 
 * @property {string} Referer - Referer header
 * @property {string} Cookie - Cookie header
 * 
 */
export interface YbHeaders {
    referer: string;
    cookie: string;
}


/******************************************************************************************
 * YellowBridge API aggregate functions to get all data for a character or word
 ******************************************************************************************/

/**
 * Get YellowBridge character aggregate
 * @param character character (single character)
 * @param headers reuse headers from previous request (optional)
 * @returns character aggregate
 */
export async function getCharacterAggregate(character: string, headers?: YbHeaders): Promise<CharacterAggregate> {
    const fetchAllCharacterAggregateData = async (character: string, headers: YbHeaders): Promise<CharacterAggregate> => {
        const promises: Promise<any>[] = [
            getWordStrokeInfo(character, headers),
            getCharacterEtymology(character, headers),
            getCharacterDetails(character, headers),
            getWordExamples(character, headers),
            getWordMeaning(character, headers),
        ];

        const results = await Promise.all(promises);
        const characterAggregate: CharacterAggregate = {
            word: character,
            strokeInfo: results[0],
            etymology: results[1],
            details: results[2],
            examples: results[3],
            meaning: results[4],
        };
        return characterAggregate;
    }

    return new Promise<CharacterAggregate>((resolve, reject) => {
        if (!headers) {
            getYellowBridgeHeaders()
                .then((headers) => fetchAllCharacterAggregateData(character, headers).then(resolve).catch(reject))
                .catch(reject);
        } else {
            fetchAllCharacterAggregateData(character, headers).then(resolve).catch(reject);
        }
    });
}



/**
 * Get YellowBridge word aggregate
 * @param word word (can be multi-character)
 * @param headers reuse headers from previous request (optional)
 * @returns word aggregate
 */
export async function getWordAggregate(word: string, headers?: YbHeaders): Promise<WordAggregate> {

    const fetchAllWordAggregateData = async (word: string, headers: YbHeaders): Promise<WordAggregate> => {
        const promises: Promise<any>[] = [
            getWordStrokeInfo(word, headers),
            getWordExamples(word, headers),
            getWordMeaning(word, headers),
        ];

        const results = await Promise.all(promises);
        const wordAggregate: WordAggregate = {
            word: word,
            strokeInfo: results[0],
            examples: results[1],
            meaning: results[2],
        };
        return wordAggregate;
    }

    return new Promise<WordAggregate>((resolve, reject) => {
        if (!headers) {
            getYellowBridgeHeaders()
                .then((headers) => fetchAllWordAggregateData(word, headers).then(resolve).catch(reject))
                .catch(reject);
        } else {
            fetchAllWordAggregateData(word, headers).then(resolve).catch(reject);
        }
    });
}

/******************************************************************************************
 * YellowBridge API functions to get individual data for a character or word
 * (these functions are used by the aggregate functions above)
 ******************************************************************************************/ 

/**
 * Get YellowBridge word stroke info
 * @param word word (can be multi-character)
 * @param headers reuse headers from previous request (optional)
 * @returns word stroke info
 */
export async function getWordStrokeInfo(word: string, headers?: YbHeaders): Promise<WordStrokeInfo> {
    try {
        const response = await fetchYb(`https://www.yellowbridge.com/chinese/character-stroke-order.php?word=${word}`, headers);
        const html = response.data;
        const $ = cheerio.load(html);


        // get title attribute of $('table#structuretd:contains("Structure") + td span')
        const result: WordStrokeInfo = {
            englishDefinition: $('table#mainData td:contains("English Definition") + td').text().trim(),
            simplifiedScript: $('table#mainData td:contains("Simplified Script") + td').text().trim(),
            traditionalScript: $('table#mainData td:contains("Traditional Script") + td a').text().trim(),
            partOfSpeech: $('table#mainData td:contains("Part of Speech") + td').text().trim(),
            kangxiRadical: $('table#radical td:contains("Kangxi Radical ") + td a').text().trim(),
            additionalStrokes: parseInt($('table#radical td:contains("Additional Stroke\\(s\\)") + td').text().trim()) || 0,
            totalStrokes: parseInt($('table#radical td:contains("Total Stroke\\(s\\)") + td').text().trim()) || 0,
            structure: $('table#structuretd:contains("Structure") + td span').attr('title')?.trim() || '',
        };

        return result;
    }
    catch (error) {
        throw mapError(error);
    }
}


/**
 * Get YellowBridge character etymology data
 * @param character character (single character)
 * @param headers reuse headers from previous request (optional)
 * @returns character etymology data
 */
export async function getCharacterEtymology(character: string, headers?: YbHeaders): Promise<CharacterEtymology> {
    try {
        const response = await fetchYb(`https://www.yellowbridge.com/chinese/character-etymology.php?zi=${character}`, headers);
        const html = response.data;
        const $ = cheerio.load(html);

        const result: CharacterEtymology = {
            definition: $('table#formation td:contains("Definition") + td').text().trim(),
            formationMethod: $('table#formation td:contains("Formation") + td').text().trim(),
            simplificationMethod: $('table#formation td:contains("Simplification") + td').text().trim(),
        };
        return result;
    }
    catch (error) {
        throw mapError(error);
    }
}

/**
 * Get YellowBridge character details
 * @param character character (single character)
 * @param headers reuse headers from previous request (optional)
 * @returns character details
 */
export async function getCharacterDetails(character: string, headers?: YbHeaders): Promise<CharacterDetails> {
    try {
        const response = await fetchYb(`https://www.yellowbridge.com/chinese/charsearch.php?zi=${character}`, headers);
        const html = response.data;
        const $ = cheerio.load(html);


        const result: CharacterDetails = {
            meaningDefinition: $('table#meaning td:contains("Definition") + td').text().trim(),
            pronuciationMandarin: $('table#pronunciation td:contains("Mandarin") + td')?.text().trim() || '',
            pronuciationCantonese: $('table#pronunciation td:contains("Cantonese") + td')?.text().trim() || '',
            pronunciationJapaneseKun: $('table#pronunciation td:contains("Japanese Kun") + td')?.text().trim() || '',
            pronunciationJapaneseOn: $('table#pronunciation td:contains("Japanese On") + td')?.text().trim() || '',
            pronunciationKorean: $('table#pronunciation td:contains("Korean") + td')?.text().trim() || '',
            pronunciationVietnamese: $('table#pronunciation td:contains("Vietnamese") + td').text().trim() || '',
            characterRankSimplified: parseInt($('table#charRank td:contains("Simplified") + td').text().trim()) || 0,
            characterRankEverydayUsage: parseInt($('table#charRank td:contains("常用字表") + td').text().trim()) || 0,
            characterRankHsk3: parseInt($('table#charRank td:contains("HSK v.3 Level") + td').text().trim()) || 0,
            characterRankHsk3Writing: parseInt($('table#charRank td:contains("HSK v.3 Writing Level") + td').text().trim()) || 0,
            relatedCharacterKangxiRadical: $('table#relatedChars td:contains("Kangxi Radical") + td').text().trim(),
            relatedCharacterTraditionalScript: $('table#relatedChars td:contains("Traditional Script") + td').text().trim(),
            relatedSemantic: $('table#relatedChars td:contains("Semantic") + td')?.text().trim() || '',
            relatedSpecializedSemantic: $('table#relatedChars td:contains("Specialized Semantic") + td')?.text().trim() || '',
            commonWordsWithCharacter: [],
            inputMethodCodes: [],
            computerEncoding: [],
        };

        $('table#commonWords tr').each((index, element) => {
            if (index > 0) {
                result.commonWordsWithCharacter.push($(element).find('td:nth-child(1)').text().trim());
            }
        });
        $('table#inputMethod tr').each((index, element) => {
            if (index > 0) {
                result.inputMethodCodes.push({
                    code: $(element).find('td:nth-child(1)').text().trim(),
                    value: $(element).find('td:nth-child(2)').text().trim(),
                });
            }
        });
        $('table#encoding tr').each((index, element) => {
            if (index > 0) {
                result.computerEncoding.push({
                    code: $(element).find('td:nth-child(1)').text().trim(),
                    value: $(element).find('td:nth-child(2)').text().trim(),
                });
            }
        });

        return result;
    }
    catch (error) {
        throw mapError(error);
    }
}

/**
 * Get YellowBridge word example sentence data
 * @param word word (can be multi-character)
 * @param headers reuse headers from previous request (optional)
 * @returns example sentence data
 */
export async function getWordExamples(word: string, headers?: YbHeaders): Promise<WordExamples> {
    try {
        const response = await fetchYb(`https://www.yellowbridge.com/chinese/sentsearch.php?word=${word}`, headers);
        const html = response.data;
        const $ = cheerio.load(html);


        const result: WordExamples = {
            englishDefinition: $('table#mainData td:contains("English Definition") + td').text().trim(),
            simplifiedScript: $('table#mainData td:contains("Simplified Script") + td').text().trim(),
            traditionalScript: $('table#mainData td:contains("Traditional Script") + td').text().trim(),
            partOfSpeech: $('table#mainData td:contains("Part of Speech") + td').text().trim(),
            sampleSentences: [],
        };

        $('table#sentences tr:nth-child(1) td:nth-child(1) li').each((index, element) => {
            const split = $(element).html()?.split('<br>');
            let english = split?.[0] || '';
            english = cheerio.load(english).text().trim();
            const chinese = split?.[1]?.trim() || '';
            result.sampleSentences.push({
                english,
                chinese,
            });
        });

        return result;
    }
    catch (error) {
        throw mapError(error);
    }
}

/**
 * Get YellowBridge word meaning
 * @param word word (can be multi-character)
 * @param headers reuse headers from previous request (optional)
 * @returns word meaning
 */
export async function getWordMeaning(word: string, headers?: YbHeaders): Promise<WordMeaning> {
    try {

        const response = await fetchYb(`https://www.yellowbridge.com/chinese/wordsearch.php?word=${word}`, headers);
        const html = response.data;
        const $ = cheerio.load(html);

        const sameHead: string[] = [];
        const sameTail: string[] = [];
        const result = {
            englishDefinition: $('table#mainData td:contains("English Definition") + td').text().trim(),
            simplifiedScript: $('table#mainData td:contains("Simplified Script") + td').text().trim(),
            traditionalScript: $('table#mainData td:contains("Traditional Script") + td').text().trim(),
            pinyin: $('table#mainData td:contains("Pinyin") + td:first-child').text().trim(),
            effectivePinyin: $('table#mainData td:contains("Effective Pinyin") + td:first-child').text().trim(),
            zhuyin: $('table#mainData td:contains("Zhuyin") + td').text().trim(),
            cantonese: $('table#mainData td:contains("Cantonese") + td').text().trim(),
            partOfSpeech: $('table#mainData td:contains("Part of Speech") + td').text().trim(),
            proficiencyLevel: $('table#mainData td:contains("Proficiency Test Level") + td').text().trim(),
            measureWord: $('table#mainData td:contains("Measure Word") + td').text().trim(),
            wordsWithSameHeadWord: sameHead,
            wordsWithSameTailWord: sameTail,
        };


        [{ array: sameHead, table: "sameHead" }, { array: sameTail, table: "sameTail" }].forEach((target) => {
            $(`#${target.table} tbody tr`).each((index, element) => {
                const firstTd = $(element).find('td:first-child');
                const word = firstTd.text().trim();
                target.array.push(word);
            });
        })

        return result;
    }
    catch (error) {
        throw mapError(error);
    }
}


/******************************************************************************************
 * YellowBridge API utility functions that are exposed for use by other modules
 ******************************************************************************************/


/**
 * Get YellowBridge headers for authorized traversal
 * @returns YellowBridge headers for authorized traversal
 */
export async function getYellowBridgeHeaders(): Promise<YbHeaders> {
    const cookie = await getYellowBridgeCookie();
    if (cookie) {
        return {
            referer: 'https://www.yellowbridge.com/chinese/character-dictionary.php',
            cookie: cookie,
        };
    }
    throw new Error('No YellowBridge cookie');
}


/******************************************************************************************
 * YellowBridge API utility functions that are not exposed for use by other modules
 ******************************************************************************************/

/**
 * Fetch YellowBridge data from URL
 * @param url the URL to fetch
 * @param headers headers to use for request authorization
 * @returns response from URL
 */
async function fetchYb(url: string, headers?: YbHeaders): Promise<AxiosResponse<any, any>> {
    try {
        if (!headers) {
            headers = await getYellowBridgeHeaders();
            if (!headers) {
                throw new Error('YellowBridge headers could not be retrieved or created');
            }
        }
        return axios.get(url, {
            headers: {
                'Referer': headers.referer,
                'Cookie': headers.cookie,
            },
        });
    }
    catch (error) {
        throw mapError(error);
    }
}


/** 
 * Get YellowBridge PHPSESSID cookie
 * @returns YellowBridge cookie
 */
async function getYellowBridgeCookie(): Promise<string> {
    const response = await axios.get('https://www.yellowbridge.com/chinese/character-dictionary.php');
    const cookie = (response.headers['set-cookie'] as string[] | undefined)?.[0]?.split(';')[0];
    if (!cookie) {
        throw new Error('No YellowBridge cookie');
    }
    return cookie;
}

/**
 * Map error to YbError
 * @param error error to map
 * @returns YbError
 */
function mapError(error: unknown): YbError {
    return {
        message: (error instanceof Error && error.message) ? error.message : 'Unknown error',
    } as YbError;
}
