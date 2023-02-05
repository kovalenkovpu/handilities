import { findByPrimaryKey } from "../findByPrimaryKey";
import { initListUtils } from "../initListUtils";

jest.mock("../findByPrimaryKey");

describe("initListUtils", () => {
  const primaryKey = "id";
  const childrenKey = "children";

  afterEach(jest.clearAllMocks);

  test("during initialization, calls 'findByPrimaryKey' utility with proper arguments", () => {
    initListUtils({ primaryKey, childrenKey });

    expect(findByPrimaryKey).toBeCalledWith(primaryKey, childrenKey);
  });

  test("provides a result of a proper signature", () => {
    (findByPrimaryKey as jest.Mock).mockImplementationOnce(() => jest.fn());

    const utils = initListUtils({ primaryKey, childrenKey });

    expect(utils).toMatchObject({
      findByPrimaryKey: expect.any(Function),
    });
  });
});
