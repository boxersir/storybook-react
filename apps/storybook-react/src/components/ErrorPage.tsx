/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-07-05 16:15:10
 * @LastEditors: caixin
 * @LastEditTime: 2024-07-05 16:15:17
 * @Description: file content
 */
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}