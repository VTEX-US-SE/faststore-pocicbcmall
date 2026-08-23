const divMaluca = ({
  ponto1,
  ponto2,
  ponto3,
  ponto4,
  ponto5,
  preco1,
  preco2,
  preco3,
  cpp,
  locale = 'es-AR',
  currencyCode = 'ARS',
}: any) => `
<div class="-cardpdpvaluebox">
    <div class="-boxheader">
        <div class="-headertitle">Redeem with points</div>
            <div class="util-flex-nospace -discountcontainer">
                <p class="-customoption">
                    <input type="radio" id="inputPrice100" name="optionprice" selected class="custom-radio" data-bind="
                            click: $parent.checkRangeCpp(event, $data, $index()), 
                            load: $parent.checkRangeCpp(event, $data), 
                            attr: {id: 'optionprice' + $index(), 
                            disabled: !$parent.enableAddCartAndChecks()}">
                    <label data-bind="attr: {for: 'optionprice' + $index()}" for="inputPrice100"></label>
                </p>
                <div class="-containerprice">
                    <span class="-oldprice">
                        <text data-bind="currency: {price: $parent.getSelectedSKUPrices().listPrice,
                            currencyObj: {'currencyCode': '', 'fractionalDigits': 0, 'symbol': ''}}">${formatPoints(
                              ponto1,
                              locale
                            )}</text>
                    </span>
                    <div class="-valueboxitem -newvalue">
                        <text data-bind="currency: {price: $data.amountPTS, currencyObj: {'currencyCode': '', 'fractionalDigits': 0, 'symbol': ''}}">${formatPoints(
                          ponto2,
                          locale
                        )}</text>
                    </div>
                </div>
            </div>
    </div>
    <div class="-boxcontent">
        <div class="-contenttitle">
            Redeem with <strong>Points<span>&amp;</span>Money</strong> 
            <span class="-info js-openmodal-info" data-toggle="modal" data-target="#mdlInfoPoints">i</span>
        </div>

            <div class="util-flex-nospace -inputbox">
                <p class="-customoption">
                    <input type="radio" id="inputPrice80" name="optionprice" selected class="custom-radio" data-bind="
                            click: $parent.checkRangeCpp(event, $data, $index()), 
                            load: $parent.checkRangeCpp(event, $data), 
                            attr: {id: 'optionprice' + $index(), 
                            disabled: !$parent.enableAddCartAndChecks()}">
                    <label data-bind="attr: {for: 'optionprice' + $index()}" for="inputPrice80"></label>
                </p>
                <div class="-valueboxitem">
                    <text data-bind="currency: {price: $data.amountPTS, currencyObj: {'currencyCode': '', 'fractionalDigits': 0, 'symbol': ''}}">${formatPoints(
                      ponto3,
                      locale
                    )}</text> 
                    <span data-bind="text: '+ '">+ </span>
                    <span data-bind="currency: { price: $data.amountBRL,
                        currencyObj: {
                        currencyCode: '${currencyCode}',
                        fractionalDigits: 2,
                        symbol: ''},
                        nullReplace: 0}">${formatCash(preco1, locale, currencyCode)}</span>
            
                </div>
            </div>
            <div class="util-flex-nospace -inputbox">
                <p class="-customoption">
                    <input type="radio" id="inputPrice70" name="optionprice" selected class="custom-radio" data-bind="
                        click: $parent.checkRangeCpp(event, $data, $index()), 
                        load: $parent.checkRangeCpp(event, $data), 
                        attr: {id: 'optionprice' + $index(), 
                        disabled: !$parent.enableAddCartAndChecks()}">
                    <label data-bind="attr: {for: 'optionprice' + $index()}" for="inputPrice70"></label>
                </p>
                <div class="-valueboxitem">
                    <text data-bind="currency: {price: $data.amountPTS, currencyObj: {'currencyCode': '', 'fractionalDigits': 0, 'symbol': ''}}">${formatPoints(
                      ponto4,
                      locale
                    )}</text>
                    <span data-bind="text: '+ '">+ </span>
                    <span data-bind="currency: { price: $data.amountBRL,
                        currencyObj: {
                        currencyCode: '${currencyCode}',
                        fractionalDigits: 2,
                        symbol: ''},
                        nullReplace: 0}">${formatCash(preco2, locale, currencyCode)}</span>
            
                </div>
            </div>
            <div class="util-flex-nospace -inputbox">
                <p class="-customoption">
                    <input type="radio" id="inputPrice60" name="optionprice" selected class="custom-radio" data-bind="
                        click: $parent.checkRangeCpp(event, $data, $index()), 
                        load: $parent.checkRangeCpp(event, $data), 
                        attr: {id: 'optionprice' + $index(), 
                        disabled: !$parent.enableAddCartAndChecks()}">
                    <label data-bind="attr: {for: 'optionprice' + $index()}" for="inputPrice60"></label>
                </p>
                <div class="-valueboxitem">
                    <text data-bind="currency: {price: $data.amountPTS, currencyObj: {'currencyCode': '', 'fractionalDigits': 0, 'symbol': ''}}">${formatPoints(
                      ponto5,
                      locale
                    )}</text> 
                    <span data-bind="text: '+ '">+ </span>
                    <span data-bind="currency: { price: $data.amountBRL,
                        currencyObj: {
                        currencyCode: '${currencyCode}',
                        fractionalDigits: 2,
                        symbol: ''},
                        nullReplace: 0}">${formatCash(preco3, locale, currencyCode)}</span>
            
                        <span class="-target">Recommended</span>
                </div>
            </div>
    </div>
</div>`

export function formatCash(
  cash: number,
  locale = 'es-AR',
  currencyCode = 'ARS'
) {
  if (cash <= 0) return ''

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cash)
}

export function formatPoints(points: number, locale = 'es-AR') {
  if (points <= 0) return ''

  return (
    new Intl.NumberFormat(locale, {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(Math.round(points)) + ' pts'
  )
}

export default divMaluca
