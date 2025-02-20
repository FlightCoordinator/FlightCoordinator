import React from "react";

import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/base-ui/button";

import { useToast } from "@/hooks/interface/use-toast";
import useCertificationDeleteMutation from "@/hooks/resource/certification/useCertificationDeleteMutation";

import Enums from "@/shared/constants/enums";
import { getLabelValueObject } from "@/shared/utils/enumUtils";

import DataTransfer from "@/types/dto";

import ColumnHeader from "../partials/ColumnHeader";
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
      },
      {
        accessorKey: "issuer",
        header: ({ column }) => <ColumnHeader column={column} title="Issuer" />,
        cell: ({ cell }) => (
          <NoWrapCell>{getLabelValueObject("CertificationIssuer", cell.row.original.issuer).label}</NoWrapCell>
        ),
      },
      {
        accessorKey: "issuingCountry",
        header: ({ column }) => <ColumnHeader column={column} title="Issuing Country" />,
        cell: ({ cell }) => (
          <NoWrapCell>
            {
              getLabelValueObject(
                "CertificationIssuingCountry",
                cell.row.original.issuingCountry as unknown as keyof typeof Enums.CertificationIssuingCountry,
              ).label
            }
          </NoWrapCell>
        ),
      },
      {
        accessorKey: "expirationDate",
        header: ({ column }) => <ColumnHeader column={column} title="Expiration Date" />,
        cell: ({ row }) => <NoWrapCell>{dayjs(row.original.expirationDate).format("DD MMM YYYY")}</NoWrapCell>,
      },
      {
        accessorKey: "validityPeriod",
        header: ({ column }) => <ColumnHeader column={column} title="Validity Period" />,
      },
      {
        accessorKey: "assignableRole",
        header: ({ column }) => <ColumnHeader column={column} title="Assignable Role" />,
        cell: ({ cell }) => getLabelValueObject("CrewRole", cell.row.original.assignableRole).label,
      },
      {
        accessorKey: "assignedCrewMember",
        header: ({ column }) => <ColumnHeader column={column} title="Assigned Crew Member" />,
        cell: ({ row }) => <NoWrapCell>{row.original.assignedCrewMember}</NoWrapCell>,
      },
      {
        id: "actions",
        header: () => <span className="select-none hover:text-foreground">Actions</span>,
        cell: ({ row }) => (
          <div className="flex flex-row items-center justify-end">
            <CertificationSheet certification={row.original} />
            <Button variant="ghost" size="icon" onClick={() => handleDeleteSubmit(row.original.id)}>
              <Trash2 />
            </Button>
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
      issuingCountry: true,
      expirationDate: true,
      validityPeriod: true,
      assignableRole: true,
      description: true,
      assignedCrewMember: true,
    }),
    [],
  );
  return { certificationColumns, certificationColumnsVisibilities };
};

export default useCertificationColumns;
