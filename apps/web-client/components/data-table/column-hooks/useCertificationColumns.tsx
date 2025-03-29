"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import dayjs from "dayjs";

import { useToast } from "@/hooks/interface/useToast";
import useCertificationDeleteMutation from "@/hooks/resource/certification/useCertificationDeleteMutation";

import { dateFormat } from "@/shared/constants/dateFormat";
import { getSelectItem } from "@/shared/constants/selectItems";
import Enums from "@/shared/enum/enums";

import DataTransfer from "@/types/dataTransfer";

import ColumnHeader from "../partials/ColumnHeader";
import DeleteResource from "../partials/DeleteResource";
import NoWrapCell from "../partials/NoWrapCell";
import getSelectColumn from "../partials/SelectColumn";
import CertificationSheet from "../sheets/CertificationSheet";

const useCertificationColumns = () => {
  const { toast } = useToast();

  const { mutateAsync: certificationDeleteMutation, error: certificationDeleteError } =
    useCertificationDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await certificationDeleteMutation({ id: id });
    if (!response.isSuccess || certificationDeleteError) {
      toast({ title: "An error ocurred", description: response.message });
      return;
    }
    toast({ title: "Deleted Successfully", description: response.message });
    return;
  };

  const certificationColumns = React.useMemo<ColumnDef<DataTransfer.CertificationDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.CertificationDTO>(),
      {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => <NoWrapCell>{row.original.id}</NoWrapCell>,
        enableHiding: false,
        enableSorting: false,
      },
      {
        accessorKey: "certificationNumber",
        header: ({ column }) => <ColumnHeader column={column} title="Certification No." />,
        cell: ({ row }) => <NoWrapCell>{row.original.certificationNumber}</NoWrapCell>,
      },
      {
        accessorKey: "issuer",
        header: ({ column }) => <ColumnHeader column={column} title="Issuer" />,
        cell: ({ row }) => (
          <NoWrapCell>
            {getSelectItem("Certifier", row.original.issuer as unknown as keyof typeof Enums.Certifier).label}
          </NoWrapCell>
        ),
      },

      {
        accessorKey: "expirationDate",
        header: ({ column }) => <ColumnHeader column={column} title="Expiration Date" />,
        cell: ({ row }) => <NoWrapCell>{dayjs(row.original.expirationDate).format(dateFormat)}</NoWrapCell>,
      },
      {
        accessorKey: "validityPeriod",
        header: ({ column }) => <ColumnHeader column={column} title="Validity Period" />,
        cell: ({ row }) => <NoWrapCell>{row.original.validityPeriod} months</NoWrapCell>,
      },
      {
        accessorKey: "description",
        header: ({ column }) => <ColumnHeader column={column} title="Description" />,
        cell: ({ row }) => <NoWrapCell>{row.original.description}</NoWrapCell>,
      },
      {
        accessorKey: "assignedCrewMemberId",
        header: ({ column }) => <ColumnHeader column={column} title="Assigned Crew Member" />,
        cell: ({ row }) => <NoWrapCell>{row.original.assignedCrewMemberId}</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <CertificationSheet certification={row.original} />
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
  const certificationColumnsVisibilities = React.useMemo<VisibilityState>(
    () => ({
      name: true,
      certificationNumber: true,
      issuer: true,
      expirationDate: true,
      validityPeriod: true,
      description: true,
      assignedCrewMemberId: true,
    }),
    [],
  );
  return { certificationColumns, certificationColumnsVisibilities };
};

export default useCertificationColumns;
