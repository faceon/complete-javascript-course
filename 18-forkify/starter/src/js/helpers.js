import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const data = await res.json();
    console.log(data, res);
    if (res.ok) return data;

    // if !res.ok
    throw new Error('We could not find the recipe you requested');
  } catch (err) {
    throw err;
  }
};
