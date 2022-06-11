import React, { useEffect, useState } from "react";

const PrivaciRoute = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return <div>PrivaciRoute</div>;
};

export default PrivaciRoute;
