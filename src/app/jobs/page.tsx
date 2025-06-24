import Header from '@/components/header';
import TabMenu from '@/components/jobs/tab-menu';

export default function Jobs() {
  return (
    <div>
      <Header />
      <div>
        <div className="relative mt-6 w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
          <TabMenu />
        </div>
      </div>
    </div>
  );
}
