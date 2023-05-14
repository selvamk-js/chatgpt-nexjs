import './loader.css';
export default function Loader() {
  return (
    <div className="overlay">
      <div className="loader"></div>
      <div className="px-2">
        <p className="text-white">Asking ChatGPT...</p>
      </div>
    </div>
  );
}
