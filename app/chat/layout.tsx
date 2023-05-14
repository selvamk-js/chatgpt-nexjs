import SideBar from '@/components/SideBar';

export const metadata = {
  title: 'Chat Dashboard',
  description: 'Chat Dashboard',
};

export default async function ChatDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
        <SideBar />
      </div>
      <div className="bg-[#e2e8f0] flex-1"> {children}</div>
    </div>
  );
}
