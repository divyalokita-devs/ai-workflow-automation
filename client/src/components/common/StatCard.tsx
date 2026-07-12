type StatCardProps = {
  title: string;
  value: string;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-slate-800">{value}</p>
    </div>
  );
};

export default StatCard;