export const fileToBuffer = (file: File): Promise<Buffer> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = (): void => {
      resolve(reader.result as Buffer);
    };
  });


export const iterableToBase64 = async (iterable: AsyncIterable<Uint8Array>): Promise<string> => {
  let chunks = Uint8Array.from([]);
  for await (const chunk of iterable) {
    chunks = Uint8Array.from([...chunks, ...chunk]);
  }

  const data = [...chunks].map(b => String.fromCharCode(b)).join('');
  return btoa(data);
};
