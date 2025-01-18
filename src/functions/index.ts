/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatPrice = (number: any): string => {
  if (number == null) return "N/A";

  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + "K";
  }
  return number.toString();
};

export const getCA = (name: string) => {
  const data: { [key: string]: string } = {
    $GOAT: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
    $GRIFFAIN: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
    $GNON: "HeJUFDxfJSzYFUuHLxkMqCgytU31G6mjP4wKviwqpump",
    $FARTCOIN: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
  };
  return data?.[name];
};
