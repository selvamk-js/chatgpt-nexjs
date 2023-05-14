import './loader.css';
export default function Loader({ message }: { message?: string }) {
  return (
    <div className="overlay">
      <div className="loader"></div>
      <div className="px-2">
        <p className="text-white">{message || 'Asking ChatGPT...'}</p>
      </div>
    </div>
  );
}
