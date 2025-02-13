interface Turnstile {
  render: (selector: string, options: object) => void;
  reset: () => void;
}

declare const turnstile: Turnstile;
