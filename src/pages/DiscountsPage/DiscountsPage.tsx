import React, { memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/client';

import Button from '../../components/Button/Button';
import penIcon from '../../assets/pen.svg';
import basketIcon from '../../assets/Basket.svg';

import styles from './discountsPage.module.scss';
import Modal from '../../components/Modal';
import DiscountForm from '../../components/DiscountForm';
import GET_DISCOUNTS from '../../graphQl/getDiscounts';
import DELETE_DISCOUNT from '../../graphQl/deleteDiscount';
import { noneOfDiscounts } from '../../locale/ru.json';

interface IDiscount {
  id: number;
  discountName: string;
  percent: number;
  condition: number;
}

const DiscountsPage = () => {
  const { id } = useParams();
  const userId = Number(id);

  const [discountList, setDiscountList] = useState<IDiscount[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [edition, setEdition] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>(0);

  const { data, error, loading, refetch } = useQuery(GET_DISCOUNTS, {
    variables: { userId },
  });

  const [deleteDiscount] = useMutation(DELETE_DISCOUNT);

  const handleClose = useCallback(() => setOpenModal(false), [setOpenModal]);
  const handleOpen = useCallback(() => {
    setOpenModal(true);
    setEdition(false);
  }, [setOpenModal]);

  const openEditModal = useCallback(
    (elementId: number) => {
      setOpenModal(true);
      setEdition(true);
      setItemId(elementId);
    },
    [setOpenModal]
  );

  const removeDiscount = (targetId: number) => {
    deleteDiscount({
      variables: {
        id: targetId,
      },
    }).then(refetch);
  };

  useEffect(() => {
    if (!loading) {
      setDiscountList(data.getDiscounts);
    }
  }, [data]);

  if (loading) {
    return <span>...Loading</span>;
  }

  if (error) {
    return <span>{`Error: ${error.message}`}</span>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Button
        type="outlined"
        size="large"
        className={styles.button}
        onClick={handleOpen}
      >
        Добавить скидку
      </Button>
      <div className={styles.discountList}>
        {discountList.length ? (
          discountList.map((item) => (
            <div className={styles.discountItem} key={item.id}>
              <span>{item.discountName}</span>
              <div className={styles.rightContainer}>
                <span>{`${item.percent}% /${item.condition} шт.`}</span>
                <div className={styles.iconsContainer}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openEditModal(item.id)}
                    className={cn(styles.icon, styles.left)}
                  >
                    <img src={penIcon} alt="pen" />
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => removeDiscount(item.id)}
                    className={cn(styles.icon, styles.right)}
                  >
                    <img src={basketIcon} alt="basket" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className={styles.noDiscounts}>{noneOfDiscounts}</span>
        )}
      </div>
      {openModal && (
        <Modal onClose={handleClose}>
          <DiscountForm
            isEdit={edition}
            propId={itemId}
            closeModal={handleClose}
            refetch={refetch}
          />
        </Modal>
      )}
    </div>
  );
};

export default memo(DiscountsPage);
