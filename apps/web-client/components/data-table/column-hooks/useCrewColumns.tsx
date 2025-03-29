"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";

import { useToast } from "@/hooks/interface/useToast";
import useCrewDeleteMutation from "@/hooks/resource/crew/useCrewDeleteMutation";

import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";

import DataTransfer from "@/types/dataTransfer";

import IdDropdown from "../data-components/IdDropdown";
import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import CrewSheet from "../sheets/CrewSheet";

const useCrewColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: crewDeleteMutation, error: crewDeleteError } = useCrewDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await crewDeleteMutation({ id: id });
    if (!response.isSuccess || crewDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const crewColumns = React.useMemo<ColumnDef<DataTransfer.CrewDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.CrewDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "fullName",
        header: ({ column }) => <ColumnHeader column={column} title="Full Name" />,
        cell: ({ row }) => <NoWrapCell>{row.original.fullName}</NoWrapCell>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => <ColumnHeader column={column} title="E-Mail" />,
        cell: ({ row }) => <NoWrapCell>{row.original.email}</NoWrapCell>,
      },
      {
        accessorKey: "phoneNumber",
        header: ({ column }) => <ColumnHeader column={column} title="Phone Number" />,
        cell: ({ row }) => <NoWrapCell>{row.original.phoneNumber}</NoWrapCell>,
      },
      {
        accessorKey: "role",
        header: ({ column }) => <ColumnHeader column={column} title="Role" />,
        cell: ({ row }) => <NoWrapCell>{getSelectItem("CrewMemberRole", row.original.role).label}</NoWrapCell>,
      },
      {
        accessorKey: "certificationIds",
        header: ({ column }) => <ColumnHeader column={column} title="Certification IDs" />,
        cell: ({ row }) => <IdDropdown ids={row.original.certificationIds} />,
      },
      {
        accessorKey: "totalFlightHours",
        header: ({ column }) => <ColumnHeader column={column} title="Total Flight Hours" />,
        cell: ({ row }) => <NoWrapCell>{row.original.totalFlightHours} h</NoWrapCell>,
      },
      {
        accessorKey: "baseAirportId",
        header: ({ column }) => <ColumnHeader column={column} title="Base Airport ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.baseAirportId}</NoWrapCell>,
      },
      {
        accessorKey: "currentAirportId",
        header: ({ column }) => <ColumnHeader column={column} title="Current Airport ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.currentAirportId}</NoWrapCell>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <ColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {
              getSelectItem("CrewMemberStatus", row.original.status as unknown as keyof typeof Enums.CrewMemberStatus)
                .label
            }
          </NoWrapCell>
        ),
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <CrewSheet crew={row.original} />
            <DeleteResource onClick={async () => await handleDeleteSubmit(row.original.id)} />
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const crewColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true,
      certificationIds: true,
      totalFlightHours: true,
      baseAirportId: true,
      currentAirportId: true,
      status: true,
    }),
    [],
  );
  return { crewColumns, crewColumnsVisibilities };
};

export default useCrewColumns;
