import React from 'react';
import { Grid, Switch } from '@mui/material';
import GlobalTextField from 'src/components/fild/textfiled';

const ContentInput = () => (
  <>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="کارمزد فرابورس" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="کارمزد انتشار" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="کارمزد ارائه خدمات" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="کارمزد طراحی" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="دوره بازپرداخت" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="دوره تامین مالی" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="سود مشارکت اسمی" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <div dir="ltr">
        <Switch />
      </div>
      <GlobalTextField label="ضمانت نامه" />
    </Grid>
  </>
);

export default ContentInput;
