"use client";

import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import dayjs from "dayjs";
import { toast } from "sonner";

import { ColumnHeader } from "@/components/data-table/partials/column-header";
import { getSelectColumn } from "@/components/data-table/partials/select-column";

import { NoWrapCell } from "@/components/data-table/data-display/no-wrap-cell";

import { CertificationSheet } from "@/components/sheets/certification-sheet";

import { DeleteResource } from "@/components/dialogs/delete-dialog";

import { useCertificationDeleteMutation } from "@/hooks/resources/certification-hooks";

import { dateFormat } from "@/shared/constants/dateFormat";
import { getSelectItem } from "@/shared/constants/selectItems";

import { Enums } from "@/shared/enum/enums";

import type { DataTransfer } from "@/types/dataTransfer";

const useCertificationColumns = () => {
  const { mutateAsync: certificationDeleteMutation, error: certificationDeleteError } =
    useCertificationDeleteMutation();

  const handleDeleteSubmit = async (id: string): Promise<void> => {
    const response = await certificationDeleteMutation({ id: id });
    if (!response.isSuccess || certificationDeleteError) {
      toast("An error ocurred");
      return;
    }
    toast("Deleted Successfully");
  };

  const certificationColumns = React.useMemo<ColumnDef<DataTransfer.CertificationDTO>[]>(
    () => [
      getSelectColumn<DataTransfer.CertificationDTO>(),
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-start">
            <CertificationSheet certification={row.original} />
            <DeleteResource onClick={async () => await handleDeleteSubmit(row.original.id)} />
          </div>
        ),
        enableHiding: false,
        enableSorting: false,
      },
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

export { useCertificationColumns };
