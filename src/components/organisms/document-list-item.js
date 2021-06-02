import React from 'react';
import {Text, View} from 'native-base';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {DocTypeBadge, StatusBadge, Heading} from '../atoms';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {LIGHT, BLACK, NAVY, LAVINA_BLUE, WHITE} from '../../styles/colors';
import {FieldsetLegend, DocumentListItemFooterActions} from '../molecules';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import moment from 'moment';
import {FONT_SIZE_16} from '../../styles/typography';
import {trimString} from '../../utils/helpers';

export default function DocumentListItem({doc, type, ...props}) {
  return (
    <>
      {doc.count ? (
        <View
          style={{
            paddingTop: hp('10.7%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Heading
            text={`Общее число документов: ${doc.count}`}
            color={NAVY}
            fontSize={FONT_SIZE_16}
          />
        </View>
      ) : (
        <TouchableHighlight
          underlayColor={WHITE}
          style={styles.card}
          onPress={() => {
            props.navigation.navigate('Document', {
              doc: doc,
            });
          }}>
          <Grid>
            <Row style={styles.headingRow}>
              <Heading
                text={
                  doc.partner ? trimString(doc.partner, 30) : 'ОДНОСТОРОННЯЯ'
                }
                wrapperStyles={{marginHorizontal: wp('5%')}}
                headingStyles={{textAlign: 'center'}}
              />
            </Row>
            <Row style={styles.badgesRow}>
              <Col>
                <DocTypeBadge text={doc.docType} />
              </Col>
              <Col>
                <StatusBadge status={doc.status} />
              </Col>
            </Row>
            <Row style={styles.fieldsetLegendRow}>
              <Col>
                <FieldsetLegend
                  label="Документ"
                  no={doc.docNo}
                  date={doc.docDate}
                />
              </Col>
              <Col>
                <FieldsetLegend
                  label="Договор"
                  no={doc.contractNo}
                  date={doc.contractDate}
                />
              </Col>
            </Row>
            <Row style={styles.totalRow}>
              <Col>
                <Heading
                  align="flex-start"
                  text={`${doc.total} сум`}
                  color={BLACK}
                  wrapperStyles={styles.totalText}
                />
              </Col>
            </Row>
            <Row style={styles.footerRow}>
              <Col style={styles.footerRowActions}>
                <DocumentListItemFooterActions doc={doc} />
              </Col>
              <Col style={styles.footerRowDate}>
                <Text style={styles.footerRowDateDay}>
                  {moment(doc.updateDate, 'DD.MM.YYYY').format('DD.MM.YYYY')}
                </Text>
                <Text style={styles.footerRowDateTime}>
                  {moment(doc.updateDate, 'DD.MM.YYYY hh:mm:ss').format(
                    'hh:mm',
                  )}
                </Text>
              </Col>
            </Row>
          </Grid>
        </TouchableHighlight>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: LIGHT,
    borderBottomColor: LIGHT,
    marginBottom: hp('2%'),
  },
  headingRow: {
    height: hp('4%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgesRow: {
    height: hp('7%'),
    marginVertical: hp('1%'),
  },
  fieldsetLegendRow: {
    marginVertical: hp('1%'),
  },
  totalRow: {
    height: hp('6%'),
    marginVertical: hp('1.2%'),
    alignItems: 'center',
  },
  totalText: {
    marginLeft: wp('5%'),
  },
  footerRow: {
    height: hp('6%'),
  },
  footerRowActions: {
    width: '70%',
    backgroundColor: '#F0F6FF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LIGHT,
  },
  footerRowDate: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
    borderWidth: 1,
    borderColor: LIGHT,
  },
  footerRowDateDay: {
    color: NAVY,
  },
  footerRowDateTime: {
    color: LAVINA_BLUE,
  },
});
