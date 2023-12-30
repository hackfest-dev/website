class HackfestError extends Error {
  public message: string;
  public type: string;
  constructor(t: string, m: string) {
    super(m);
    this.message = m;
    this.type = t;
  }
}

export default HackfestError;
