export function sum(values) {
    return values.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
}

export function average(values) {
    const validNumbers = values.map((val) => parseFloat(val)).filter((num) => !isNaN(num));
    return validNumbers.length ? sum(validNumbers) / validNumbers.length : 0;
}

export function max(values) {
    return Math.max(...values.map((val) => parseFloat(val)).filter((num) => !isNaN(num)));
}

export function min(values) {
    return Math.min(...values.map((val) => parseFloat(val)).filter((num) => !isNaN(num)));
}

export function count(values) {
    return values.length;
}

export function stdev(values) {
    const avg = average(values);
    const variance =
        values.reduce((acc, val) => acc + Math.pow((parseFloat(val) || 0) - avg, 2), 0) / values.length;
    return Math.sqrt(variance);
}

export function median(values) {
    const sorted = values.map((val) => parseFloat(val)).filter((num) => !isNaN(num)).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function mode(values) {
    const freq = {};
    values.forEach((val) => {
        const num = parseFloat(val);
        if (!isNaN(num)) freq[num] = (freq[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(freq));
    return Object.keys(freq).filter((key) => freq[key] === maxFreq).map(Number);
}

export function trim(value) {
    return value.trim();
}

export function upper(value) {
    return value.toUpperCase();
}

export function lower(value) {
    return value.toLowerCase();
}

export function removeDuplicates(values) {
    return [...new Set(values)];
}

export function findAndReplace(values, find, replace) {
    return values.map((val) => val.replaceAll(find, replace));
}

export function processFormula(formula, cells) {
    try {
        if (!formula.startsWith("=")) return formula;

        const match = formula.match(/^=(\w+)\((.*?)\)$/);
        if (!match) return "ERROR";

        const [, functionName, args] = match;
        const argList = args.split(",").map((arg) => arg.trim());

        let values = [];
        argList.forEach((arg) => {
            if (arg.includes(":")) {
                const [start, end] = arg.split(":");
                const [startCol, startRow] = [start[0].charCodeAt(0) - 65, parseInt(start.slice(1)) - 1];
                const [endCol, endRow] = [end[0].charCodeAt(0) - 65, parseInt(end.slice(1)) - 1];
                for (let r = startRow; r <= endRow; r++) {
                    for (let c = startCol; c <= endCol; c++) {
                        values.push(cells[r]?.[c] || "");
                    }
                }
            } else if (/^[A-Z]\d+$/.test(arg)) {
                const col = arg[0].charCodeAt(0) - 65;
                const row = parseInt(arg.slice(1)) - 1;
                values.push(cells[row]?.[col] || "");
            } else {
                values.push(arg.replace(/['"]+/g, ""));
            }
        });

        switch (functionName.toUpperCase()) {
            case "SUM": return sum(values);
            case "AVERAGE": return average(values);
            case "MAX": return max(values);
            case "MIN": return min(values);
            case "COUNT": return count(values);
            case "STDEV": return stdev(values);
            case "MEDIAN": return median(values);
            case "MODE": return mode(values).join(", ");
            case "TRIM": return trim(values[0]);
            case "UPPER": return upper(values[0]);
            case "LOWER": return lower(values[0]);
            case "REMOVE_DUPLICATES": return spreadRemoveDuplicates(values, argList[0], cells);
            case "FIND_AND_REPLACE":
                if (values.length < 2) return "ERROR: Missing arguments";
                return findAndReplace(values, values[1], values[2]).join(", ");
            default:
                return "ERROR: Unknown Function";
        }
    } catch (error) {
        return "ERROR";
    }
}

function spreadRemoveDuplicates(values, range, cells) {
    const uniqueValues = [...new Set(values)];
    const match = range.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
    if (!match) return "ERROR"; // Ensure valid range format

    const [, startCol, startRow] = match;
    const colIdx = startCol.charCodeAt(0) - 65; // Convert column letter to index
    let rowIdx = parseInt(startRow, 10) - 1; // Convert row number to index

    // Fill unique values in the correct column
    uniqueValues.forEach((value, index) => {
        if (cells[rowIdx + index]) {
            cells[rowIdx + index][colIdx] = value;
        }
    });

    // Clear remaining cells in the range
    for (let i = rowIdx + uniqueValues.length; i <= parseInt(match[4]) - 1; i++) {
        if (cells[i]) cells[i][colIdx] = "";
    }

    return "";  // Prevents displaying unique values in the formula cell
}

