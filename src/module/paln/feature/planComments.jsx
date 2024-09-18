import React, { useEffect, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCommit, sendCommit } from '../service/commentService';

const PlanComments = ({ idRow }) => {
  const [commentData, setCommentData] = useState([]);

  const { data } = useQuery({
    queryKey: ['planCommit', idRow],
    queryFn: () => fetchCommit(idRow),
  });

  useEffect(() => {
    if (data) {
      setCommentData(data.data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationKey: ['sendCommits', idRow],
    mutationFn: (updatedData) => sendCommit(updatedData, idRow),
  });

  const handleCellEdited = () => {
    // mutation.mutate(commentData);
    console.log(commentData);
  };



  const columns = [
    { title: 'نام', field: 'name', width: 250 },
    { title: 'متن نظر', field: 'comment', width: 340 },
    {
      title: 'وضعیت',
      field: 'status',
      hozAlign: 'center',
      width: 220,
      formatter: 'tickCross',
      editor: 'select',
      editorParams: { values: { true: 'انتشار', false: 'عدم انتشار' } },
    },
    {
      title: 'نمایش نام',
      field: 'known',
      hozAlign: 'center',
      width: 220,
      formatter: 'tickCross',
      editor: 'select',
      editorParams: { values: { true: 'نام نمایش داده شود', false: 'نام نمایش داده نشود' } },
    },
  ];

  return (
    <div>
      <ReactTabulator
        data={commentData}
        columns={columns}
        layout="fitData"
        cellEdited={handleCellEdited}
      />
    </div>
  );
};

PlanComments.propTypes = {
  idRow: PropTypes.number.isRequired,
};

export default PlanComments;
