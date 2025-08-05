export default function Test() {
    return (
      <div>
        <div className="hidden md:block bg-red-500 text-white p-4">Im only on Desktop</div>
        <div className="block md:hidden bg-blue-500 text-white p-4">Im only on Mobile</div>
      </div>
    );
  }
  