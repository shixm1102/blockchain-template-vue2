<template>
  <p @click="$changeLang">{{ $t("hello") }}</p>
</template>

<script>
export default {
  name: "HelloI18n",
};
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "zh": {
    "hello": "你好 i18n in SFC!"
  }
}
</i18n>
