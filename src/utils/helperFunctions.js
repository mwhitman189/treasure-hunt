const getRandomImage = probability => {
    const symbols = [ '🐸', '🦈', '🦀', '🌟' ];
    let randIdx = null;
    const randomFraction = Math.random();
    randIdx = Math.floor(Math.random() * symbols.length);

    if (randomFraction < probability) {
        return symbols[ randIdx ];
    } else {
        return false;
    }
};

export { getRandomImage };
