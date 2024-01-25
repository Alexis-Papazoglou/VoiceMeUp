export function evenlyDestructureText(text, maxWordsPerPart) {
  // Split the text into words
  const words = text.split(' ');

  // Initialize an array to store the parts
  const parts = [];

  let currentPart = '';
  for (const word of words) {
      if (currentPart === '') {
          currentPart = word;
      } else {
          const currentPartLength = currentPart.split(' ').length;
          if (currentPartLength + 1 <= maxWordsPerPart) {
              currentPart += ' ' + word;
          } else {
              parts.push(currentPart);
              currentPart = word;
          }
      }
  }

  // Add the last part (if any)
  if (currentPart !== '') {
      parts.push(currentPart);
  }

  return parts;
}



