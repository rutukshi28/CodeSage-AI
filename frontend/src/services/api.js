export const reviewCodeAPI = async (code, language) => {
  const res = await fetch("https://codesage-ai-mmtc.onrender.com/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
      language: language, 
    }),
  });

  return res.json();
};

export const runCodeAPI = async (code, language) => {
  const res = await fetch("https://codesage-ai-mmtc.onrender.com/api/review/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, language }),
  });

  return res.json();
};

