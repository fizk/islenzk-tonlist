export default (name, variations = []) => {
    return [name].concat(variations.map(variant => `${name}--${variant}`)).join(' ');
};
