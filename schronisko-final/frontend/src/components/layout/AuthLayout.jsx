const AuthLayout = ({ title, children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;