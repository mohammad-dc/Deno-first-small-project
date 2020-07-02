import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Activity } from "../types/activity.ts";

let activities: Activity[] = [
  {
    activity: "Learn how to write in shorthand",
    accessibility: 0.1,
    type: "education",
    participants: 1,
    price: "",
    link: "",
    id: "6778219",
  },
  {
    activity: "Learn how to french braid hair",
    accessibility: 0.1,
    type: "education",
    participants: 1,
    price: "",
    link: "",
    id: "8926492",
  },
  {
    activity: "Compliment someone",
    accessibility: 0.0,
    type: "social",
    participants: 2,
    price: "",
    link: "",
    id: "9149470",
  },
];

const getActivites = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: activities,
  };
};

const getActivityById = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const activity = activities.find((a) => a.id === params.id);
  console.log(activity);

  if (activity) {
    response.status = 200;
    response.body = {
      success: true,
      data: activity,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Activity Found!",
    };
  }
};

const postActivites = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();

  console.log(body);

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data provided",
    };
  } else {
    const activity = body.value;

    response.status = 201;
    activity.id = v4.generate();

    response.body = {
      success: true,
      data: activity,
    };
  }
};

const updataActivity = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const activity = activities.find(
    (p) => p.id === params.id,
  );

  if (activity) {
    const body = await request.body();

    const updateData = body.value;

    activities = activities.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: activities,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Activity found",
    };
  }
};

const deleteActivity = (
  { params, response }: { params: { id: string }; response: any },
) => {
  activities = activities.filter((a) => {
    a.id === params.id;
  });

  response.body = {
    success: true,
    msg: "activity deleted!",
  };
};

export {
  getActivites,
  getActivityById,
  postActivites,
  updataActivity,
  deleteActivity,
};
