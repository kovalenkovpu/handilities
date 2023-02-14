interface IBeautifyNumberOptions {
  delimiter?: string;
  joint?: string;
}

interface IBeautifyNumber {
  (value: number, options?: IBeautifyNumberOptions): string;
}

const sameJointAndDelimiterErrorMessage = "Please provide different delimiter and joint values";

const DEFAULT_DELIMITER = ".";
const DEFAULT_JOINT = " ";

/**
 *
 * @param value number to format based on options
 * @param options "joint" symbol to add between thousands, and "delimiter" symbol to join whole and floating parts
 * @returns string produced out of a formatted number
 */
const beautifyNumber: IBeautifyNumber = (value, options = {}) => {
  const { delimiter = DEFAULT_DELIMITER, joint = DEFAULT_JOINT } = options;

  if (delimiter === joint) {
    const error = new Error(sameJointAndDelimiterErrorMessage);

    throw error;
  }

  const [whole, decimal] = String(value).split(".");
  const wholeWithJoint = whole.replace(/\B(?=(\d{3})+(?!\d))/g, joint);

  return decimal ? `${wholeWithJoint}${delimiter}${decimal}` : wholeWithJoint;
};

export type { IBeautifyNumber, IBeautifyNumberOptions };
export { sameJointAndDelimiterErrorMessage, beautifyNumber };
