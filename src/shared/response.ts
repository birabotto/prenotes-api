export const successResponse = (res: any, data: any, message: string) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: any,
  message: string,
  statusCode: number
) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
