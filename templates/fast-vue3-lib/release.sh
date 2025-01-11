echo "release type $1"

if [ "$1" == "beta" ]; then
  pnpm run changeset pre enter beta
fi

if [ "$1" != "publish" ]; then
  echo "检查变更集合"
  pnpm changeset

  echo "生成changelog 和 更新版本"
  pnpm version-pak

  echo "打最新包, include: $2"
  if [ "$2" == "comp" ]; then
    pnpm run build:lib
  elif [ "$2" == "utils" ]; then
    pnpm run build:utils
  else
    pnpm build
  fi
fi

if [ "$1" == 'publish' ]; then
  echo "发布 beta 版本"
  #  pnpm publish:only
  result=(`pnpm publish:only | grep -o 'New tag: .*' | awk '{print $3}'`)
  # 获取结果数组长度
  array_length=${#result[@]}

  if [[ $array_length -gt 0 ]]; then
    echo 'changesets发包完毕'
    echo "本次发布成功的版本: \n$result"

    for pkg in "${result[@]}"; do
      # 推送最新的tag到远端分支
      git push origin $pkg
    done
  else
    echo "changesets发包失败(${ecode})"
  fi

  echo "退出beta 模式"
  pnpm exit:beta
fi