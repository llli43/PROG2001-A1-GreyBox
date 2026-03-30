using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>
/// 场景加载管理器
/// 用于在菜单场景和游戏场景之间切换
/// </summary>
public class SceneLoader : MonoBehaviour
{
    /// <summary>
    /// 加载指定名称的场景
    /// </summary>
    /// <param name="sceneName">场景名称</param>
    public void LoadScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }

    /// <summary>
    /// 加载游戏场景
    /// </summary>
    public void LoadGameScene()
    {
        SceneManager.LoadScene("GameScene");
    }

    /// <summary>
    /// 加载菜单场景
    /// </summary>
    public void LoadMenuScene()
    {
        SceneManager.LoadScene("MenuScene");
    }

    /// <summary>
    /// 退出游戏
    /// </summary>
    public void QuitGame()
    {
        #if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
        #else
            Application.Quit();
        #endif
    }
}
