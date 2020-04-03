import React from "react";
import { Divider, Card, CardContent } from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

export default function SkeletonCard() {
  return (
    <>
      <Card>
        <CardContent>
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="text" width="80%" height={8} />
        </CardContent>

        <Divider />
        <CardContent>
          <Skeleton variant="text" width="100%" height={8} />
        </CardContent>
      </Card>
    </>
  );
}
