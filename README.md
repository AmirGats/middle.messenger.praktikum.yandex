const generateRange = (start, end, step) => {
    const size = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    return Array.from({ length: size }, (_, i) => start + i * step);
};

function range(start = 0, end, step) {
    if (end === undefined) [start, end] = [0, start];
    step = step ?? (start < end ? 1 : -1);

    return generateRange(start, end, step);
}


console.log(range(0))