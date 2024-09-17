import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { useMutation } from '@tanstack/react-query';
import PlanDeleteModal from './plandeleteModal';
import PlanCreateModal from './planCreateModal';
import PlanUpdateModal from './planUpdate';
import deletePlan from '../service/planService';

const PlanTableFeature = ({ planData }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateRowData, setUpdateRowData] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['deletePlan', selectedRow?.id],
    mutationFn: () => deletePlan(selectedRow?.id),
    onSuccess: () => {
      QueryClient.invalidateQueries('plans');
      setShowConfirm(false);
    },
    onError: (error) => {
      console.error('Error deleting plan:', error);
    },
  });

  const handleAddOpen = () => setOpenAddModal(true);
  const handleAddClose = () => setOpenAddModal(false);

  const handleDeleteClick = () => {
    if (selectedRow) {
      setShowConfirm(true);
    }
    handleCloseContextMenu();
  };

  const handleConfirmClose = () => setShowConfirm(false);

  const handleSendDeletePlan = () => {
    mutation.mutate();
    setShowConfirm(false);
    planData();
  };

  const handleUpdateClose = () => setOpenUpdateModal(false);

  const handleRowClick = (e, row) => {
    const rowData = row.getData();
    const { id } = rowData;
    if (id) {
      navigate(`/plandetail/${id}`);
    } else {
      console.error('No ID found in row data.');
    }
  };

  const handleContextMenu = (e, row) => {
    e.preventDefault();
    const rowData = row.getData();
    setSelectedRow(rowData);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const columns = [
    { title: 'نام طرح', field: 'plan_name', width: 250 },
    { title: 'نام شرکت', field: 'company_name', width: 300 },
    { title: 'نماد', field: 'symbol', width: 200 },
    { title: 'مبلغ تایین شده', field: 'funded_amount', align: 'left', width: 200 },
    { title: 'سود', field: 'fundeprofitd_amount', align: 'left', width: 200 },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '16px 0' }}
        onClick={handleAddOpen}
      >
        افزودن طرح
      </Button>
      <div style={{ height: '500px' }}>
        <ReactTabulator
          data={planData}
          columns={columns}
          layout="fitData"
          options={{ movableRows: true }}
          events={{
            rowClick: handleRowClick,
            rowContext: handleContextMenu,
          }}
        />
      </div>
      <PlanCreateModal open={openAddModal} onClose={handleAddClose} />
      <PlanDeleteModal
        showConfirm={showConfirm}
        handleConfirmClose={handleConfirmClose}
        handleDeleteConfirm={handleSendDeletePlan}
        isLoading={mutation.isLoading}
      />
      {updateRowData && (
        <PlanUpdateModal
          open={openUpdateModal}
          onClose={handleUpdateClose}
          item={updateRowData}
          handleInputChange={(field, value) => {
            setUpdateRowData((prev) => ({
              ...prev,
              [field]: value,
            }));
          }}
          index={planData.findIndex((row) => row.id === updateRowData.id)}
        />
      )}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={handleDeleteClick}>حذف</MenuItem>
      </Menu>
    </div>
  );
};

PlanTableFeature.propTypes = {
  planData: PropTypes.array.isRequired,
};

export default PlanTableFeature;
