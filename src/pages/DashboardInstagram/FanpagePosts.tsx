import React, { useState } from "react";
import clsx from "clsx";
import { Menu, Popover, Tab } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { useParams } from "react-router-dom";
import { useFanpagePosts } from "@/hooks/useFanpagePosts";

const users = {
  fakeUsers() {
    return [
      {
        name: "John Doe",
        photo:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400",
        department: "Marketing",
        location: "California, USA",
        phone: "+1 202 555 0174",
        email: "john.doe@example.com",
      },
      {
        name: "Sarah Parker",
        photo:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
        department: "Design",
        location: "New York, USA",
        phone: "+1 202 555 0189",
        email: "sarah.parker@example.com",
      },
    ];
  },
};

export default function FanpagePosts() {
  const params = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const user = users.fakeUsers()[0];

  const { posts, loading, error } = useFanpagePosts(
    "682172884986712", // ig_user_id
    "EAAOaM0NcAc4BQEpCSnGRQAyWcIvaS8q5ZBMZBYZAkP2297y1zAzzIAHFWUvjUOOqUC6CfNgiFvUQveYEimIoPzlAcUrGv4Qz2LefBy82afvchZCZCNoSHMqKbCjvLejmMlxzCKqid2F00hYMwX5YnsB0JbZASOmCWkA5pHPYR5p1JzCitNEqSxRdrZAiPevWW31cY8wgo6E"        // access_token
  );

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row mb-3">
          <Breadcrumb light className="flex-1 hidden xl:block">
            <Breadcrumb.Link
              className="dark:before:bg-chevron-white"
              to={`/workspace/${params?.workspace_id}`}
            >
              Home
            </Breadcrumb.Link>
            <Breadcrumb.Link
              className="dark:before:bg-chevron-white"
              to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}`}
            >
              Instagram
            </Breadcrumb.Link>
            <Breadcrumb.Link
              className="dark:before:bg-chevron-white"
              to={`/workspace/${params?.workspace_id}/connections/${params?.connection_type}/${params?.connection_id}`}
            >
              {params?.connection_id}
            </Breadcrumb.Link>
            <Breadcrumb.Link
              className="dark:before:bg-chevron-white"
            >
              Fanpage
            </Breadcrumb.Link>
          </Breadcrumb>
        </div>
        <div className="p-1.5 box flex flex-col box--stacked">
          {/* HEADER BANNER */}
          <div className="h-48 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
            <div
              className={clsx([
                "w-full h-full relative overflow-hidden",
                "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
              ])}
            ></div>

            <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-24">
              <div className="w-full h-full overflow-hidden border-[6px] border-white rounded-full image-fit">
                <img src={user.photo} alt="" />
              </div>

              <div className="absolute bottom-0 right-0 w-5 h-5 mb-2.5 mr-2.5 border-2 border-white rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* User Info */}
          <div className="rounded-[0.6rem] bg-slate-50 dark:bg-black pt-12 pb-6">
            <div className="flex items-center justify-center text-xl font-medium">
              {user.name}
              <Lucide
                icon="BadgeCheck"
                className="w-5 h-5 ml-2 text-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-5 mt-2.5">
              <div className="flex items-center text-slate-500">
                <Lucide icon="Briefcase" className="w-3.5 h-3.5 mr-1.5" />
                {user.department}
              </div>

              <div className="flex items-center text-slate-500">
                <Lucide icon="MountainSnow" className="w-3.5 h-3.5 mr-1.5" />
                <a href="#">{user.location}</a>
              </div>

              <div className="flex items-center text-slate-500">
                <Lucide icon="Signal" className="w-3.5 h-3.5 mr-1.5" />
                {user.phone}
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <Tab.Group
          className="mt-10"
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
        >
          <div className="flex flex-col 2xl:items-center 2xl:flex-row gap-y-3">
            <Tab.List
              variant="boxed-tabs"
              className="flex-col sm:flex-row w-full 2xl:w-auto mr-auto box rounded-[0.6rem] border-slate-200"
            >
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Postagens
                </Tab.Button>
              </Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Events
                  <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full text-theme-1/70 bg-theme-1/10 border-theme-1/10">
                    7
                  </div>
                </Tab.Button>
              </Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Achievements
                </Tab.Button>
              </Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Contacts
                  <div className="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full text-theme-1/70 bg-theme-1/10 border-theme-1/10">
                    5
                  </div>
                </Tab.Button>
              </Tab>
              <Tab className="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current">
                <Tab.Button
                  className="w-full xl:w-40 py-2.5 text-slate-500 whitespace-nowrap rounded-[0.6rem] flex items-center justify-center text-[0.94rem]"
                  as="button"
                >
                  Default
                </Tab.Button>
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-3.5 box box--stacked p-4">
                <div>
                  {posts.map((p) => (
                    <img key={p.id} src={p.media_url} width={180} />
                  ))}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-3.5">
                2222222
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-3.5">
                333333333
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-3.5">
                444444444
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-3.5">
                5555555
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
