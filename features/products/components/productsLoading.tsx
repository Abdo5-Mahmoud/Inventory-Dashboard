import { ProgressRingLoader } from "react-loadly";

export function ProductsLoading() {
  return (
    <ProgressRingLoader
      size={45}
      color="#ff8080"
      speed={1}
      aria-label="Loading"
      showText={true}
      loadingText="Loading..."
      loaderCenter={true}
      progress={50}
      thickness={8}
      secondaryColor="#e0e7ff"
    />
  );
}
