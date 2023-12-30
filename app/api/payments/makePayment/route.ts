import { createPaymentLink, getAuthToken } from '@/lib/utils/paymentHelper';
import { NextRequest, NextResponse } from 'next/server';
import { SetuUPIDeepLink } from '@setu/upi-deep-links';

export async function POST(req: NextRequest) {
  try {
    const upidl = SetuUPIDeepLink({
      schemeID: process.env.SETU_CLIENT_ID as string,
      secret: process.env.SETU_CLIENT_SECRET as string,
      productInstanceID: process.env.SETU_INSTANCE_ID as string,
      mode: 'SANDBOX',
      authType: 'OAUTH',
    });

    const paymentLink = await upidl.createPaymentLink({
      amountValue: 10,
      amountExactness: 'EXACT',
      billerBillID: '12211',
      settlement: {
        primaryAccount: {
          id: process.env.SETU_PRIMARY_ACCOUNT_ID as string,
          ifsc: process.env.SETU_PRIMARY_ACCOUNT_IFSC as string,
        },
        parts: [],
      },
    });
    const result = await upidl.triggerMockPayment({
      amountValue: 10,
      vpa: process.env.SETU_PRIMARY_ACCOUNT_ID as string,
      platformBillID: paymentLink.platformBillID,
    });
    const token = await (await getAuthToken()).json();
    const resp = await fetch(
      'https://uat.setu.co/api/v2/triggers/funds/mockSettlement',
      {
        method: 'POST',
        headers: {
          'X-Setu-Product-Instance-ID': process.env.SETU_INSTANCE_ID || '',
          Authorization: 'Bearer ' + token.data.token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          transactions: [{ utr: result.utr }],
        }),
      }
    );
    console.log(result);
    console.log(await upidl.getPaymentStatus(paymentLink.platformBillID));
    return NextResponse.json({
      message: 'success',
      paymentLink,
      transaction_id: result.utr,
      settlement: await resp.text(),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: 'error',
    });
  }
}
