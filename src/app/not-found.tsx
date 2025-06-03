import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-2">
      <Image
        src="https://cdn3d.iconscout.com/3d/premium/thumb/todo-list-3d-icon-download-in-png-blend-fbx-gltf-file-formats--task-to-do-plan-daily-planner-pack-miscellaneous-icons-8168038.png?f=webp"
        alt="Todo Icon"
        width={250}
        height={250}
      />
      <div className="flex flex-col gap-2 items-start">
        <span className="text-[24px] font-semibold">404 - Page Not Found</span>
        <span>The page you are looking for does not exist or has been removed.</span>
        <Link
          href={'/'}
          className="flex items-center cursor-pointer gap-1 bg-[var(--main-color)] px-3 py-2 rounded-lg"
        >
          <span className="text-[white] text-[14px] font-medium">← Return to Home Page</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
