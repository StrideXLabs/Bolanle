export interface IDefaultAPIResponse<T = {}> {
  data: T | null;
  message: string;
  success: boolean;
}
