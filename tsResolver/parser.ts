export const Parser = {
  /**
   * 코드 문자열에서 ES 모듈 import 구문을 파싱하고, .ts 또는 .tsx 확장자를 추가합니다.
   * @example
   * code = code.replace(/import { (.*?)} from '([^']*)';/g, (match, p1, p2) => {
   * return `import { ${p1} } from '${p2}.ts';`;
   * });
   * @param code 코드 문자열
   * @returns 확장자가 추가된 코드 문자열
   * */

  parse: (code: string) => {
    /**
     * .ts 확장자가 필요한 import 구문을 찾아서 수정합니다
     * 예: import { Component } from './Component'; -> import { Component } from './Component.ts';
     * */
    code = code.replace(/import { (.*?)} from '([^']*)';/g, (match, p1, p2) => {
      /**
       * .tsx 확장자가 필요한 파일인지 결정하는 로직도 추가가 가능. 다만, 모듈 전용으로 사용할 예정이므로 추가하지 않음
       * */
      return `import { ${p1} } from '${p2}.ts';`;
    });

    // export const 구문을 찾아서 Object.assign을 사용한 형태로 변환합니다. 이 변환은 객체를 함수의 파라미터로 받는 화살표 함수를 대상으로 합니다.
    code = code.replace(
      /export const (.*?) = \(({.*?})\) => {/g,
      'export const $1 = Object.assign($2 => {'
    );

    return code;
  },

  /**
   * parse 메소드에 의해 수정된 코드를 원래 형태로 복구합니다.
   * @example
   * code = code.replace(/import { (.*?)} from '([^']*)\.ts';/g, "import { $1 } from '$2';");
   * code = code.replace(/export const (.*?) = Object.assign\((.*?)\) => {/g, 'export const $1 = $2 => {');
   *
   * @param code 코드 문자열
   * @returns 확장자가 제거된 코드 문자열
   */
  restore: (code: string) => {
    // .ts 확장자가 추가된 import 구문을 원래 형태로 복원
    // 예: import { Component } from './Component.ts'; -> import { Component } from './Component';
    code = code.replace(
      /import { (.*?)} from '([^']*)\.ts';/g,
      "import { $1 } from '$2';"
    );

    /**
     * Object.assign을 사용한 구문을 원래의 화살표 함수 형태로 복원합니다.
     * FIXME: 현재 코드는 Object.assign 변환의 정확한 역변환을 수행하지 않는 상태이며, 단위테스트 추가와 함께 로직 검증이 필요합니다.
     */
    code = code.replace(
      /export const (.*?) = Object.assign\((.*?)\) => {/g,
      'export const $1 = $2 => {'
    );

    return code;
  },
};
