const ErrorPage = (route: string) => {
  return `
    <div>
      <h1>404: PAGE NOT FOUND!!</h1>
      <h2>Are you sure about the ${route}?</h2>
      <a href="http://localhost:5500">돌아가기</a>
    </div>
    `;
};

export default ErrorPage;
