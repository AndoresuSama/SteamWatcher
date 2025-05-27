function generateMockGame(query) {
  const id = Date.now();
  return {
    id,
    name: query,
    releaseDate: {
      value: "2023-10-12",
      hasChanged: false
    },
    price: {
      value: "$59.99",
      finalPrice: "$47.99",
      discount: "-20%",
      hasChanged: true
    },
    reviews: {
      value: "Very Positive",
      hasChanged: false
    },
    image: {
      value: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
      hasChanged: false
    }
  };
}

// ✅ Compatibilidad con navegador (HTML o Electron)
if (typeof window !== 'undefined') {
  window.generateMockGame = generateMockGame;
}

// ✅ Compatibilidad con Node (Jest)
if (typeof module !== 'undefined') {
  module.exports = { generateMockGame };
}
