function generateTwoSumSteps(nums, target) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    // Brute Force Generation
    let found = false;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const sum = nums[i] + nums[j];
            const isMatch = sum === target;

            bruteForceSteps.push({
                step: bruteForceSteps.length + 1,
                description: isMatch
                    ? `Target ${target} found at indices ${i} and ${j}!`
                    : `Checking index i=${i} (val=${nums[i]}) and j=${j} (val=${nums[j]}). Sum: ${sum}`,
                activeLine: isMatch ? 6 : 5,
                state: {
                    pointers: [
                        { id: 'i', index: i, color: 'accent-blue' },
                        { id: 'j', index: j, color: 'purple-500' }
                    ],
                    found: isMatch,
                    customState: { sum, target }
                }
            });
            if (isMatch) {
                found = true;
                break;
            }
        }
        if (found) break;
    }

    // Optimal Generation
    const mapArr = {};
    found = false;
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        const isMatch = mapArr[complement] !== undefined;

        optimalSteps.push({
            step: optimalSteps.length + 1,
            description: isMatch
                ? `Found complement ${complement} at index ${mapArr[complement]}!`
                : `Iterating index i=${i} (val=${nums[i]}). Looking for complement: ${complement}`,
            activeLine: isMatch ? 7 : 5,
            state: {
                pointers: [{ id: 'i', index: i, color: 'accent-blue' }],
                mapState: { ...mapArr },
                found: isMatch,
                customState: { complement, target }
            }
        });

        if (isMatch) {
            found = true;
            break;
        }

        mapArr[nums[i]] = i;
        optimalSteps.push({
            step: optimalSteps.length + 1,
            description: `Complement not found. Adding ${nums[i]} to the hash map.`,
            activeLine: 9,
            state: {
                pointers: [{ id: 'i', index: i, color: 'accent-blue' }],
                mapState: { ...mapArr },
                found: false
            }
        });
    }

    return { bruteForceSteps, optimalSteps };
}

function generateSlidingWindowSteps(s, targetIgnored) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    // Brute Force: Check every substring
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const sub = s.substring(i, j + 1);
            const set = new Set();
            let hasRepeat = false;
            for (const char of sub) {
                if (set.has(char)) {
                    hasRepeat = true;
                    break;
                }
                set.add(char);
            }

            const isCurrentMax = !hasRepeat && sub.length > maxLen;
            if (isCurrentMax) maxLen = sub.length;

            bruteForceSteps.push({
                step: bruteForceSteps.length + 1,
                description: hasRepeat
                    ? `Substring "${sub}" has repeating characters.`
                    : `Substring "${sub}" is valid. Length: ${sub.length}`,
                activeLine: hasRepeat ? 15 : 10,
                state: {
                    windowRange: [i, j],
                    pointers: [
                        { id: 'i', index: i, color: 'accent-blue' },
                        { id: 'j', index: j, color: 'purple-500' }
                    ],
                    found: isCurrentMax,
                    customState: { currentLen: sub.length, maxLen, hasRepeat }
                }
            });
        }
    }

    // Optimal: Sliding Window
    const charSet = new Set();
    let l = 0;
    let res = 0;
    const sArr = s.split('');

    for (let r = 0; r < sArr.length; r++) {
        const charR = sArr[r];

        while (charSet.has(charR)) {
            const charL = sArr[l];
            optimalSteps.push({
                step: optimalSteps.length + 1,
                description: `Duplicate detected! Removing "${charL}" at index ${l} and shrinking window.`,
                activeLine: 10,
                state: {
                    windowRange: [l, r],
                    pointers: [
                        { id: 'l', index: l, color: 'accent-blue' },
                        { id: 'r', index: r, color: 'purple-500' }
                    ],
                    mapState: Array.from(charSet).reduce((obj, c) => ({ ...obj, [c]: true }), {}),
                    customState: { currentLen: r - l, maxLen: res, duplicateChar: charR }
                }
            });
            charSet.delete(charL);
            l++;
        }

        charSet.add(charR);
        const currentLen = r - l + 1;
        const isNewMax = currentLen > res;
        if (isNewMax) res = currentLen;

        optimalSteps.push({
            step: optimalSteps.length + 1,
            description: isNewMax
                ? `New maximum length found! Window: "${s.substring(l, r + 1)}", Length: ${currentLen}`
                : `Expanding window to include "${charR}" at index ${r}. Window: "${s.substring(l, r + 1)}"`,
            activeLine: isNewMax ? 13 : 12,
            state: {
                windowRange: [l, r],
                pointers: [
                    { id: 'l', index: l, color: 'accent-blue' },
                    { id: 'r', index: r, color: 'purple-500' }
                ],
                mapState: Array.from(charSet).reduce((obj, c) => ({ ...obj, [c]: true }), {}),
                found: isNewMax,
                customState: { currentLen, maxLen: res }
            }
        });
    }

    return { bruteForceSteps, optimalSteps };
}

function generateLinkedListSteps(l1Arr, l2Arr) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    // Simulate Add Two Numbers (LSD First)
    let carry = 0;
    let i = 0;
    let result = [];

    while (i < Math.max(l1Arr.length, l2Arr.length) || carry) {
        const v1 = l1Arr[i] || 0;
        const v2 = l2Arr[i] || 0;
        const sum = v1 + v2 + carry;
        const digit = sum % 10;
        const newCarry = Math.floor(sum / 10);

        const stepData = {
            step: optimalSteps.length + 1,
            description: `Adding ${v1} + ${v2} ${carry ? `+ carry ${carry}` : ''} = ${sum}. Digit: ${digit}, New Carry: ${newCarry}`,
            activeLine: 5,
            state: {
                phase: (i >= l1Arr.length && i >= l2Arr.length) ? 'found' : 'searching',
                pointers: { l1: i < l1Arr.length ? i : null, l2: i < l2Arr.length ? i : null },
                customState: { carry, sum, digit },
                result: [...result, digit]
            }
        };

        optimalSteps.push(stepData);
        bruteForceSteps.push(stepData); // Brute is same for this problem in our simple sim

        result.push(digit);
        carry = newCarry;
        i++;
    }

    return { bruteForceSteps, optimalSteps };
}

function generateMedianSteps(nums1, nums2) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    // Brute Force: Merge and find median
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const mid = Math.floor(merged.length / 2);
    const median = merged.length % 2 === 0 ? (merged[mid - 1] + merged[mid]) / 2 : merged[mid];

    bruteForceSteps.push({
        step: 1,
        description: `Merging arrays [${nums1}] and [${nums2}] into single sorted array.`,
        state: {
            phase: 'searching',
            array: merged,
            pointers: {},
            customState: { median: null }
        }
    });

    bruteForceSteps.push({
        step: 2,
        description: `Median found: ${median}`,
        state: {
            phase: 'found',
            array: merged,
            pointers: { i: mid },
            customState: { median }
        }
    });

    // Optimal: Binary Search Partitioning
    // Simplified sim for the binary search cut
    let A = nums1, B = nums2;
    if (A.length > B.length) [A, B] = [B, A];
    const total = A.length + B.length;
    const half = Math.floor((total + 1) / 2);

    let l = 0, r = A.length;
    while (l <= r) {
        const i = Math.floor((l + r) / 2);
        const j = half - i;

        const Aleft = i > 0 ? A[i - 1] : -Infinity;
        const Aright = i < A.length ? A[i] : Infinity;
        const Bleft = j > 0 ? B[j - 1] : -Infinity;
        const Bright = j < B.length ? B[j] : Infinity;

        optimalSteps.push({
            step: optimalSteps.length + 1,
            description: `Checking partition at index ${i} in Array 1 and ${j} in Array 2.`,
            state: {
                phase: 'searching',
                array1: A,
                array2: B,
                pointers: { i, j },
                customState: { Aleft, Aright, Bleft, Bright }
            }
        });

        if (Aleft <= Bright && Bleft <= Aright) {
            const actualMedian = total % 2 === 1
                ? Math.max(Aleft, Bleft)
                : (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;

            optimalSteps.push({
                step: optimalSteps.length + 1,
                description: `Correct partition found! Median: ${actualMedian}`,
                state: {
                    phase: 'found',
                    array1: A,
                    array2: B,
                    pointers: { i, j },
                    customState: { median: actualMedian }
                }
            });
            break;
        } else if (Aleft > Bright) {
            r = i - 1;
        } else {
            l = i + 1;
        }
    }

    return { bruteForceSteps, optimalSteps };
}

function generatePalindromeSteps(s) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    // Brute Force: Check all substrings
    let maxPal = "";
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const sub = s.substring(i, j + 1);
            const isPal = sub === sub.split('').reverse().join('');
            if (isPal && sub.length > maxPal.length) maxPal = sub;

            bruteForceSteps.push({
                step: bruteForceSteps.length + 1,
                description: `Checking substring "${sub}". ${isPal ? "It's a palindrome!" : "Not a palindrome."}`,
                state: {
                    phase: isPal ? 'found' : 'searching',
                    windowRange: [i, j],
                    pointers: { i, j },
                    customState: { currentLen: sub.length, maxLen: maxPal.length, isPal }
                }
            });
        }
    }

    // Optimal: Expand Around Center
    let res = "";
    for (let i = 0; i < s.length; i++) {
        // Odd length
        expandCenter(i, i);
        // Even length
        expandCenter(i, i + 1);
    }

    function expandCenter(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            const currentSub = s.substring(l, r + 1);
            if (currentSub.length > res.length) res = currentSub;

            optimalSteps.push({
                step: optimalSteps.length + 1,
                description: `Symmetry found! Expanding from center. Substring: "${currentSub}"`,
                state: {
                    phase: 'searching',
                    windowRange: [l, r],
                    pointers: { l, r },
                    customState: { currentLen: currentSub.length, maxLen: res.length }
                }
            });
            l--;
            r++;
        }
    }

    optimalSteps.push({
        step: optimalSteps.length + 1,
        description: `Final longest palindromic substring: "${res}"`,
        state: {
            phase: 'found',
            windowRange: [0, s.length - 1], // Placeholder
            customState: { maxLen: res.length, finalPalindrome: res }
        }
    });

    return { bruteForceSteps, optimalSteps };
}

function generateZigzagSteps(s, numRows) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    if (numRows === 1) {
        const step = {
            step: 1,
            description: `numRows is 1, string remains unchanged: "${s}"`,
            state: { phase: 'found', string: s, pointers: {}, customState: { numRows } }
        };
        return { bruteForceSteps: [step], optimalSteps: [step] };
    }

    const rows = Array.from({ length: numRows }, () => "");
    let currRow = 0;
    let stepping = -1;

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (currRow === 0 || currRow === numRows - 1) stepping *= -1;
        rows[currRow] += char;

        optimalSteps.push({
            step: i + 1,
            description: `Placing "${char}" in row ${currRow}.`,
            state: {
                phase: 'searching',
                string: s,
                pointers: { i, currRow },
                customState: { rows: [...rows], direction: stepping > 0 ? "down" : "up" }
            }
        });
        currRow += stepping;
    }

    optimalSteps.push({
        step: optimalSteps.length + 1,
        description: `Final Zigzag result: "${rows.join('')}"`,
        state: {
            phase: 'found',
            string: rows.join(''),
            customState: { finalRows: rows }
        }
    });

    bruteForceSteps.push(...optimalSteps); // Brute and optimal are very similar in simulation for this problem
    return { bruteForceSteps, optimalSteps };
}

function generateReverseIntegerSteps(x) {
    const steps = [];
    let res = 0;
    let tempX = Math.abs(x);
    const sign = x < 0 ? -1 : 1;

    steps.push({
        step: 1,
        description: `Starting reversal of ${x}. Sign: ${sign}`,
        state: { phase: 'searching', customState: { x, res: 0, sign } }
    });

    while (tempX > 0) {
        const pop = tempX % 10;
        tempX = Math.floor(tempX / 10);

        // Overflow check (simplified for 32-bit)
        if (res > (Math.pow(2, 31) - 1) / 10) {
            steps.push({
                step: steps.length + 1,
                description: `Overflow detected! Returning 0.`,
                state: { phase: 'found', customState: { x, res: 0, overflow: true } }
            });
            return { bruteForceSteps: steps, optimalSteps: steps };
        }

        res = res * 10 + pop;
        steps.push({
            step: steps.length + 1,
            description: `Popped ${pop}, current result: ${res * sign}`,
            state: { phase: 'searching', customState: { remainingX: tempX, currentRes: res * sign, pop } }
        });
    }

    steps.push({
        step: steps.length + 1,
        description: `Reversal complete: ${res * sign}`,
        state: { phase: 'found', customState: { finalRes: res * sign } }
    });

    return { bruteForceSteps: steps, optimalSteps: steps };
}

function generateAtoiSteps(s) {
    const steps = [];
    let i = 0;
    let res = 0;
    let sign = 1;

    steps.push({
        step: 1,
        description: `Input string: "${s}". Trimming whitespace...`,
        state: { phase: 'searching', pointers: { i: 0 }, customState: { s } }
    });

    const trimmed = s.trimStart();
    i = s.indexOf(trimmed);

    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        steps.push({
            step: steps.length + 1,
            description: `Sign detected: ${s[i]}`,
            state: { phase: 'searching', pointers: { i }, customState: { sign } }
        });
        i++;
    }

    while (i < s.length && /[0-9]/.test(s[i])) {
        const digit = parseInt(s[i]);

        // Overflow checks
        if (res > Math.floor((Math.pow(2, 31) - 1) / 10) ||
            (res === Math.floor((Math.pow(2, 31) - 1) / 10) && digit > 7)) {
            res = sign === 1 ? Math.pow(2, 31) - 1 : Math.pow(2, 31);
            steps.push({
                step: steps.length + 1,
                description: `Overflow detected! Clamping to 32-bit limit.`,
                state: { phase: 'found', customState: { clampedValue: sign * res } }
            });
            return { bruteForceSteps: steps, optimalSteps: steps };
        }

        res = res * 10 + digit;
        steps.push({
            step: steps.length + 1,
            description: `Added digit ${digit}, current: ${res * sign}`,
            state: { phase: 'searching', pointers: { i }, customState: { currentRes: res * sign } }
        });
        i++;
    }

    steps.push({
        step: steps.length + 1,
        description: `Parsing complete. Final integer: ${res * sign}`,
        state: { phase: 'found', customState: { finalValue: res * sign } }
    });

    return { bruteForceSteps: steps, optimalSteps: steps };
}

function generatePalindromeNumberSteps(x) {
    const steps = [];
    if (x < 0) {
        steps.push({
            step: 1,
            description: `Negative numbers can't be palindromes.`,
            state: { phase: 'found', customState: { x, isPalindrome: false } }
        });
        return { bruteForceSteps: steps, optimalSteps: steps };
    }

    let rev = 0;
    let tempX = x;

    steps.push({
        step: 1,
        description: `Checking if ${x} is a palindrome.`,
        state: { phase: 'searching', customState: { x, rev: 0 } }
    });

    while (tempX > 0) {
        rev = rev * 10 + (tempX % 10);
        tempX = Math.floor(tempX / 10);
        steps.push({
            step: steps.length + 1,
            description: `Extracted digit, half-reverse: ${rev}, remaining: ${tempX}`,
            state: { phase: 'searching', customState: { remaining: tempX, reversedPortion: rev } }
        });
    }

    const isPal = x === rev;
    steps.push({
        step: steps.length + 1,
        description: isPal ? `${x} matches its reverse! Palindrome confirmed.` : `${x} != ${rev}. Not a palindrome.`,
        state: { phase: 'found', customState: { isPal } }
    });

    return { bruteForceSteps: steps, optimalSteps: steps };
}

function generateRegexSteps(s, p) {
    const steps = [];
    // This is a simplified sim of the decision branches
    steps.push({
        step: 1,
        description: `Starting regex match for string "${s}" with pattern "${p}".`,
        state: { phase: 'searching', customState: { s, p } }
    });

    // We'll simulate a few high-level matching steps
    let si = 0, pi = 0;
    while (pi < p.length) {
        const charP = p[pi];
        const nextP = p[pi + 1];

        if (nextP === '*') {
            steps.push({
                step: steps.length + 1,
                description: `Wildcard "*" detected for character "${charP}".`,
                state: { phase: 'searching', pointers: { si, pi }, customState: { charP, wildcard: true } }
            });
            pi += 2; // Jump over char and *
        } else {
            const match = si < s.length && (charP === '.' || charP === s[si]);
            steps.push({
                step: steps.length + 1,
                description: match ? `Match: "${s[si]}" matches "${charP}".` : `Mismatch: "${s[si]}" does not match "${charP}".`,
                state: { phase: match ? 'searching' : 'found', pointers: { si, pi }, customState: { match } }
            });
            if (!match) break;
            si++;
            pi++;
        }
    }

    return { bruteForceSteps: steps, optimalSteps: steps };
}

function generateContainerSteps(heights) {
    const bruteForceSteps = [];
    const optimalSteps = [];

    // Optimal: Two Pointers
    let l = 0, r = heights.length - 1;
    let maxArea = 0;

    while (l < r) {
        const hL = heights[l];
        const hR = heights[r];
        const width = r - l;
        const currentArea = Math.min(hL, hR) * width;
        const isNewMax = currentArea > maxArea;
        if (isNewMax) maxArea = currentArea;

        optimalSteps.push({
            step: optimalSteps.length + 1,
            description: `Window [${l}, ${r}]: height=${Math.min(hL, hR)}, width=${width}. Area: ${currentArea}`,
            state: {
                phase: 'searching',
                array: heights,
                pointers: [
                    { id: 'left', index: l, color: 'accent-blue' },
                    { id: 'right', index: r, color: 'purple-500' }
                ],
                found: isNewMax,
                calculation: `min(${hL}, ${hR}) * ${width} = ${currentArea}`,
                customState: { maxArea }
            }
        });

        if (hL < hR) l++;
        else r--;
    }

    optimalSteps.push({
        step: optimalSteps.length + 1,
        description: `Maximum area found: ${maxArea}`,
        state: { phase: 'found', array: heights, customState: { maxArea } }
    });

    bruteForceSteps.push(...optimalSteps); // Simplified
    return { bruteForceSteps, optimalSteps };
}

module.exports = {
    generateTwoSumSteps,
    generateSlidingWindowSteps,
    generateLinkedListSteps,
    generateMedianSteps,
    generatePalindromeSteps,
    generateZigzagSteps,
    generateReverseIntegerSteps,
    generateAtoiSteps,
    generatePalindromeNumberSteps,
    generateRegexSteps,
    generateContainerSteps
};
