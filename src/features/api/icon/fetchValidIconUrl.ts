// Deprecated: Previously validated remote SVG availability via HEAD requests.
// The Icon component now builds URLs synchronously and uses <img> onError
// to fallback to the 'plain' variant, eliminating the extra network roundtrip.
